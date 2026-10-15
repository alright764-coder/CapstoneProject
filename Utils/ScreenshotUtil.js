class ScreenshotUtil {

    constructor(page){
        this.page = page;
    }

    async takeScreenshot(name) {
        await this.page.screenshot({path: `screenshots/${name}.png`,fullPage: true
        });
    }
}

module.exports = ScreenshotUtil;