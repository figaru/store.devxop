import './home.html';

import '../../components/hello/hello.js';
import '../../components/info/info.js';

const Stores = new Mongo.Collection(null);
const StorePages = new Mongo.Collection(null);
const StoreSections = new Mongo.Collection(null);


TempProducts = new Mongo.Collection(null);
TempCollections = new Mongo.Collection(null);


Template.App_home.onRendered(function () {

    let sectionId = StoreSections.insert({
        type: "image_with_text_overlay",
        image: "",
        image_alignment: "left", //right
        section_height: "lg", //lg, xl, md, sm, xs
        text_size: "md", //lg, md
        heading: "image with text",
        text: "Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
        button_label: "",
        button_link: ""
    });

    let sectionId2 = StoreSections.insert({
        type: "image_with_text",
        image: "",
        image_alignment: "left", //right
        section_height: "lg", //lg, xl, md, sm, xs
        text_size: "md", //lg, md
        heading: "image with text",
        text: "Pair large text with an image to give focus to your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.",
        button_label: "",
        button_link: ""
    });

    let sectionId3 = StoreSections.insert({
        type: "text_column_with_image",
        heading: "image with text",
        columns: [{
            show_image: true,
            image: "",
            heading: "Add a title or tagline",
            text: "Share blog posts, products, or promotions with your customers. Use this text to describe products, share details on availability and style, or as a space to display recent reviews or FAQs.",
            button_label: "",
            button_link: ""
        }, {
            show_image: true,
            image: "",
            heading: "Add a title or tagline",
            text: "Share blog posts, products, or promotions with your customers. Use this text to describe products, share details on availability and style, or as a space to display recent reviews or FAQs.",
            button_label: "",
            button_link: ""
        }, {
            show_image: true,
            image: "",
            heading: "Add a title or tagline",
            text: "Share blog posts, products, or promotions with your customers. Use this text to describe products, share details on availability and style, or as a space to display recent reviews or FAQs.",
            button_label: "",
            button_link: ""
        }],
        text_alignment: "left", //centered 

    });

    let sectionId4 = StoreSections.insert({
        type: "featured_collection",
        heading: "Featured collection",
        collection: "collection1",
        text_alignment: "left", //centered 

    });

    let sectionId5 = StoreSections.insert({
        type: "gallery",
        heading: "Gallery",
        images: [
            {image: "https://devxop.com/img/landing_bg.png", image_alignment: "middle", caption: "Test image 1", link: ""},
            {image: "https://devxop.com/img/landing_bg.png", image_alignment: "middle", caption: "", link: ""},
            {image: "https://devxop.com/img/landing_bg.png", image_alignment: "middle", caption: "", link: ""}
        ],
        section_height: "lg", //centered 

    });

    let sectionId6 = StoreSections.insert({
        type: "collection_list",
        heading: "Gallery",
        collections: ["collection1", "collection1", "collection1","collection1"],
        section_height: "lg", //centered 

    });

    let sectionId7 = StoreSections.insert({
        type: "rich_text",
        heading: "Talk About your brand",
        text: "",
        size: "lg", //lg - md - sm

    });

    Stores.insert({
        name: "Devxop",
        endpoint: "test",
        header: {
            logo_image: "",
            logo_alignment: "left", //centered
            logo_width: "100px",
            menu: "", //adda menu id
        },
        pages: [
            { name: "home", sections: [sectionId, sectionId2, sectionId3, sectionId4, sectionId5, sectionId6] },
            { name: "test", sections: [] },
        ],
        footer: {
            show_payment_icons: true,
        }
    });
});

Template.App_home.helpers({
    store: function () {
        return Stores.findOne();
    },
    get_page: function () {

        let store = Stores.findOne();

        if (store) {
            var endpoint = FlowRouter.getParam("endpoint");

            let page = searchArrayObj(endpoint, store.pages);

            console.log(page);

            if (!page)
                FlowRouter.go("/");

            return page;

        }

    },
    get_section: function (sectionId) {
        return StoreSections.findOne(sectionId);
    },
    get_collection: function (collectionId) {
        //get collection from server and add to temp collection client side
        insertTempCollection(collectionId);
        return TempCollections.findOne(collectionId);
    },
    get_product: function (productId) {
        //get product from server and add to temp collection client side
        insertTempProduct(productId);
        return TempProducts.findOne(productId);
    },
    type_is_equal: function (sectionType, expectedType) {
        //here we check that the section type is equal to compare query
        //section.type == "image_with_tex"
        return sectionType == expectedType;
    }
});


const insertTempCollection = function (id) {
    let collection = TempCollections.findOne({"_id": id});
    if (!collection) {
        Meteor.call("collection.get", function (err, data) {
            if (!err && data){
                delete data["_id"];
                TempCollections.upsert({"_id": id}, {
                    $set: data
                });
            }   
        });
    }
}

const insertTempProduct = function (id) {
    let product = TempProducts.findOne(id);
    if (!product) {
        Meteor.call("product.get", function (err, data) {
            if (!err && data){
                delete data["_id"];
                TempProducts.upsert({"_id": id}, {
                    $set: data
                });
            }
        });
    }
}

const callWithPromise = (method, ...myParameters) => new Promise((resolve, reject) => {
    Meteor.call(method, ...myParameters, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
});


function searchArrayObj(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}