import crypto from 'crypto';

export function validateN8nSignature(
    body: string,
    signature: string,
    secret: string
): boolean {
    try {
        const hash = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        return crypto.timingSafeEqual(
            Buffer.from(hash),
            Buffer.from(signature)
        );
    } catch {
        return false;
    }
}

export async function triggerN8nWorkflow(
    workflowName: string,
    payload: any,
    webhookSecret?: string
): Promise<any> {
    const n8nUrl = process.env.N8N_URL;

    if (!n8nUrl) {
        console.warn('n8n not configured: N8N_URL missing');
        return null;
    }

    try {
        const body = JSON.stringify(payload);
        const headers: any = {
            'Content-Type': 'application/json',
        };

        // Add signature if secret provided
        if (webhookSecret) {
            const signature = crypto
                .createHmac('sha256', webhookSecret)
                .update(body)
                .digest('hex');
            headers['x-n8n-signature'] = signature;
        }

        const response = await fetch(
            `${n8nUrl}/webhook/${workflowName}`,
            {
                method: 'POST',
                headers,
                body
            }
        );

        if (!response.ok) {
            throw new Error(`n8n returned ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('n8n workflow trigger failed:', error);
        throw error;
    }
}
