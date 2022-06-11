const {Rating, Product} = require('./../models/models');
const jwt = require('jsonwebtoken');

class RatingController {
    async addRating(req, res) {
        try {
            const {rate, productId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            await Rating.create({rate, productId, userId: user.id});

            let rating = await Rating.findAndCountAll({
                where: {
                    productId
                },
            });

            let allRating = 0;
            let middleRating;
            rating.rows.forEach(item => allRating += item.rate);
            middleRating = Number(allRating) / Number(rating.count);

            await Product.update(
                {rating: middleRating},
                {where: {id: productId}}
            );

            return res.json("Rating success added");
        } catch (e) {
            console.error(e);
        }
    }

    async checkRating(req, res) {
        try {
            const {productId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const checkRating = await Rating.findOne({where: {productId, userId: user.id}});
            const checkProducts =  await Product.findOne({where: {id: productId}});
            if (!checkProducts) {
                return res.json({allow: false});
            } else if(checkRating && checkProducts) {
                return res.json({allow: false});
            }
            return res.json({allow: true});
        } catch (e) {
            return res.status(401).json("Something going wrong in checkAddRatingMiddleware.js");
        }
    }
}

module.exports = new RatingController();
