import { catalogSource } from '../../src/lib/catalog-source';
import { validScheduleRange } from '../../src/lib/calendar-dates';
export default async function handler(req, res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method !== 'GET') { res.setHeader('Allow','GET'); return res.status(405).json({error:'Method not allowed.'}); }
  const from=Number(req.query.from), to=Number(req.query.to), page=Number(req.query.page || 1);
  if(!validScheduleRange(from,to) || !Number.isInteger(page) || page<1 || page>10) return res.status(400).json({error:'Choose a week within eight weeks of today. A request covers at most eight days.'});
  const query=`query($from:Int,$to:Int,$page:Int){Page(page:$page,perPage:50){pageInfo{hasNextPage} airingSchedules(airingAt_greater:$from,airingAt_lesser:$to,sort:TIME){id episode airingAt media{id title{english romaji} format genres status episodes isAdult siteUrl}}}}`;
  try {
    const result=await catalogSource(query,{from:from-1,to,page},`schedule:${from}:${to}:${page}`,60000);
    if(!result.ok) { if(result.status===429) res.setHeader('Retry-After',String(result.retryAfter || 60)); return res.status(result.status===429?429:502).json({error:result.status===429?'Schedule requests are temporarily limited. Wait before trying again.':'The schedule provider is unavailable.',retryAfter:result.retryAfter || null}); }
    const data=result.json?.data?.Page;
    if(result.json?.errors || !Array.isArray(data?.airingSchedules)) throw new Error('Invalid schedule');
    const items=data.airingSchedules.filter(item=>item.media && !item.media.isAdult && Number.isFinite(item.airingAt) && item.airingAt>=from && item.airingAt<to);
    return res.json({items,hasNextPage:!!data.pageInfo?.hasNextPage,source:'AniList',fetchedAt:new Date().toISOString()});
  } catch { return res.status(502).json({error:'Could not load the schedule. Please try again.'}); }
}
