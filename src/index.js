const requestFactory = require('./request');
const Scraper = require('./scraper');

const requestService = requestFactory();
const scraper = Scraper(requestService);

const sleep = time => new Promise((resolve) => setTimeout(resolve, time));

scraper
    .fetchPage({
        url: 'https://iptu.campinas.sp.gov.br/iptu/index.html',
    }, ($html, result) => {
        return {
            ancorasIptu: $html('a').length,
            inputsIptu: $html('input').length,
        };
    })
    .goToPage({
        url: 'https://www.campinas.com.br/'
    }, ($html, result) => {
        return {
            ...result,
            ancorasCampinas: $html('a').length,
            inputsCampinas: $html('input').length,
        };
    })
    .getResult()
    .then(result => console.log('Resultado de tudo...', result));
