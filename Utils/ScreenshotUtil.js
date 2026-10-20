class ScreenshotUtil {

    constructor(page) {
        this.page = page;
    }

    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`
        });
    }
}

module.exports = ScreenshotUtil;
