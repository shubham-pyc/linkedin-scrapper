const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const utils = require("./utils");
const EducationScrapper = require("./educaiton_scrapper")
const ExperienceScrapper = require("./experience_scrapper");
const ProjectScrapper = require("./project_scrapper");

const profile = {
    about: "", //done
    projects: "", //done

    skills: [],
    birthDate: "",
    fullName: "", //done
    jobTitle: "", //done
    email: "",
    skillDescription: ``,
    profileDescription: ``,
    workExperience: [],//done
    education: [] //done

}
function scrapName() {
    let nameQuery = ".top-card-layout__entity-info-container .top-card-layout__title",
        retValue = "";
    try {
        retValue = $(nameQuery).text();
    } catch (e) {
        console.error(e);
    }
    return retValue;
}

function scraptAbout() {
    var retValue,
        aboutQuery = ".summary.pp-section p",
        urlRegex = /.*?\:.*?(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?.*?\n?/g
    try {
        let rawHTML = $(aboutQuery).html();
        rawHTML = utils.convertHTMLtoMultiLineString(rawHTML);
        rawHTML = rawHTML.replace(urlRegex, "");
        rawHTML = utils.removeExtraNewLines(rawHTML);
        retValue = rawHTML;
    } catch (e) {
        console.error(e);
    }
    return retValue;
}



async function scrapProfile(cred) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin', { waitUntil: 'load' });

    //await page.screenshot({path: 'example.png'});
    await page.exposeFunction('getCreds', () => {
        return cred;
    })



    await page.evaluate(async (cred) => {

        const creds = await getCreds();
        //console.warn(creds);
        document.location.pathname = creds.url;

    })

    await page.waitFor(1000);

    const context = await page.content();
    global.$ = cheerio.load(context);

    profile.fullName = scrapName();
    profile.about = scraptAbout();
    profile.projects = new ProjectScrapper().scrap();
    profile.workExperience = new ExperienceScrapper().scrap();
    profile.education = new EducationScrapper().scrap();

    browser.close();

    return profile;

}

module.exports = scrapProfile;