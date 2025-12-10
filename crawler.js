import { PlaywrightCrawler, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({

    // Empêche l’ouverture de plusieurs pages (cause principale de vos crashs)
    maxConcurrency: 1,

    browserPoolOptions: {
        maxOpenPagesPerBrowser: 1,
        useFingerprints: false,
    },

    launchContext: {
        useIncognitoPages: true,
        launchOptions: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--single-process',
                '--no-zygote'
            ],
        },
    },

    maxRequestsPerCrawl: 20,

    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`Captured: ${title}`);

        await Dataset.pushData({
            title,
            url: request.loadedUrl,
            crawled_at: new Date().toISOString()
        });

        await enqueueLinks({
            strategy: 'same-domain',
        });
    },

    failedRequestHandler({ request, log }) {
        log.error(`Failed request: ${request.url}`);
    },
});

await crawler.run(['https://crawlee.dev']);
