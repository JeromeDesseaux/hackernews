import axios from "axios";

module.exports.getNewsFeed = async (req, res, next) => {
    const quantity = req.query.perPage || 25;
    const query = req.params.query;

    // Endpoint documentation https://hn.algolia.com/api
    const request = `https://hn.algolia.com/api/v1/search?query=${query}&hitsPerPage=${quantity}`;
    
    try {
        let news = await axios.get(request);
        res.status(200).send(news.data);
    } catch (error) {
        res.status(500).send(error);
    }

}