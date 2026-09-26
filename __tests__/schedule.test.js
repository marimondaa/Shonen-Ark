import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/schedule';
import { catalogSource } from '../src/lib/catalog-source';
import { validScheduleRange, weekDates, localDay } from '../src/lib/calendar-dates';
jest.mock('../src/lib/catalog-source', () => ({catalogSource:jest.fn()}));
const from = Math.floor(Date.now()/1000), to=from+7*86400;
async function request(query={from,to},method='GET') { const {req,res}=createMocks({method,query}); await handler(req,res); return res; }
beforeEach(() => jest.clearAllMocks());
test('schedule refuses unbounded ranges, fractional pages and writes before calling source', async () => {
  expect((await request({from,to:from+9*86400})).statusCode).toBe(400);
  expect((await request({from,to,page:1.5})).statusCode).toBe(400);
  expect((await request({from,to},'POST')).statusCode).toBe(405);
  expect(catalogSource).not.toHaveBeenCalled();
});
test('schedule preserves real timestamps, filters adult and outside-window entries, exposes pagination', async () => {
  const item={id:1,episode:3,airingAt:from,media:{id:4,title:{romaji:'Test fixture'},isAdult:false}};
  catalogSource.mockResolvedValue({ok:true,json:{data:{Page:{airingSchedules:[item,{...item,id:2,airingAt:to},{...item,id:3,media:{...item.media,isAdult:true}}],pageInfo:{hasNextPage:true}}}}});
  const res=await request(); expect(res.statusCode).toBe(200); expect(res._getJSONData().items).toEqual([item]); expect(res._getJSONData().hasNextPage).toBe(true);
  expect(res.getHeader('Cache-Control')).toBe('no-store');
});
test('provider rate limit and unavailable schedules are honest', async () => {
  catalogSource.mockResolvedValue({ok:false,status:429,retryAfter:37});
  let res=await request(); expect(res.statusCode).toBe(429); expect(res.getHeader('Retry-After')).toBe('37');
  catalogSource.mockResolvedValue({ok:true,json:{data:{Page:{airingSchedules:[],pageInfo:{hasNextPage:false}}}}});
  res=await request(); expect(res._getJSONData().items).toEqual([]);
  catalogSource.mockRejectedValue(new Error('offline')); expect((await request()).statusCode).toBe(502);
});
test('weeks use local midnight, Monday boundaries and year transitions', () => {
 const dates=weekDates(new Date(2027,0,1,16)); expect(localDay(dates[0])).toBe('2026-12-28'); expect(localDay(dates[7])).toBe('2027-01-04'); expect(dates.every(date=>date.getHours()===0)).toBe(true);
 expect(validScheduleRange(from,to,from*1000)).toBe(true); expect(validScheduleRange(from,from+9*86400,from*1000)).toBe(false);
});
