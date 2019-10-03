const Crawler = require('crawler');
const NEWS_URL = "https://g1.globo.com";
const crawler = new Crawler();


function handleRequestCategory(request, response, baseUrl) {

    crawler.queue([
        {
            uri: `${NEWS_URL}/${baseUrl}`,
            callback: function (error, responseCallBack, done) {

                const jquery = responseCallBack.$.bind(responseCallBack.$);
                const elements = jquery('.feed-root').find('.feed-post-body');
                const news = [];

                elements.each(function () {
                    const element = jquery(this);
                    const photo = element.find('.bstn-fd-picture-image').attr('src');
                    const title = element.find('.feed-post-link').text();
                    const summary = element.find('.feed-post-body-resumo').text();

                    if (title && summary) {
                        news.push({
                            photo,
                            title,
                            summary,
                        })
                    }
                })
                done();
                response.status(200).send(news)

            }
        }
    ]);
}
module.exports = {
    handleRequestCategory
}