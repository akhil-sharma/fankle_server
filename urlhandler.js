const url = process.env.MONGO_URL;

const {nanoid} = require("nanoid");
const yup = require("yup");
const db = require('monk')(url);

const urlsCollection = db.get('urls');
urlsCollection.createIndex({slug: 1}, {unique: true});

const baseUrl = process.env.BASE_URL;

const generateUrlSchema = yup.object().shape({
    url: yup.string().trim().url().required(),
    slug: yup.string().trim().matches(/^$|[\w\-]/i)
});

const redirToBaseUrl = async (req, res, next) => {
    const { id: slug } = req.params;
    try {
      const url = await urlsCollection.findOne({ slug });
      if (url) {
        return res.redirect(url.url);
      }
      throw Error("Invalid slug/alias.")
    } catch (error) {
        // log the error
        return res.redirect(`${baseUrl}/error`);
    }
};

const generateUrl = async (req, res, next) => {
    let {url, slug} = req.body;

    try {
        await generateUrlSchema.validate({url, slug});

        if (!slug || slug.length == 0) {
            slug = nanoid(10);
        } else {
            const existingSlug = await urlsCollection.findOne({slug});
            if (existingSlug) {
                throw new Error('Slug already in use.')
            }
        }

        slug = slug.toLowerCase();
        const newRecord = {
            url,
            slug
        };
        const created = await urlsCollection.insert(newRecord);
        res.json({success:true, url: created.url, slug: created.slug});
    
    } catch(error){
        next(error);
    }
}

module.exports = {
    generateUrl,
    redirToBaseUrl
}