import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`Captured: ${title}`);

        await Dataset.pushData({
            title,
            url: request.loadedUrl,
            crawled_at: new Date().toISOString(),
        });

        await enqueueLinks();
    },
    maxRequestsPerCrawl: 50,
    maxConcurrency: 5,
});

await crawler.run(['https://crawlee.dev']);
