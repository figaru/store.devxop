Meteor.methods({
    'collection.get':function(){
        return {
            _id: "collection1",
            heading: "Collection 1",
            products: ["product1"],
        }
    },
    'product.get':function(){
        return {
            _id: "product1",
            title: "Product Test 1",
            price: 11.0
        }
    },
    'test': function() {
        console.log("method call:", "test");
    

        return new Promise((resolve, reject) =>{

            setTimeout(function(){
                resolve("responded after 3 seconds");
            }, 3000);
        });
    },
});
