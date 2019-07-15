var ObjectId = require('mongodb').ObjectID;
module.exports = function (app, db) {
    //API thêm mới 1 post
    app.post("/posts", (req, res) => {
        //Thêm mới 1 Post
        console.log(req.body);
        const post = {title: req.body.title};
        db.collection("post").insertOne(post, (err, rsl) => {
            if (err) {
                res.send({'err': "Có lỗi xảy ra!"});
            } else {
                res.send(rsl.ops[0]);
            }
        });
    });

    //API đọc thông tin của 1 post
    app.get("/posts/:id", (req, res) => {
        const id = req.params.id;
        const condition = {"_id": new ObjectId(id)};
        db.collection("post").findOne(condition, (err, item) => {
            if (err) {
                res.send({'error': "Có lỗi xảy ra!"});
            } else {
                res.send(item);
            }
        });
    });

    //api cập nhật thông tin của 1 post
    app.put("/posts/:id", (req, res) => {
        const id = req.params.id;
        const condition = {"_id": new ObjectId(id)};
        const post = {"title": req.body.title};
        db.collection("post").updateOne(condition, post, (err, rsl) => {
            if (err) {
                res.send({"error": "Có lỗi xảy ra"});
            } else {
                res.send(post);
            }
        });
    });

    //api xoá 1 post theo id
    app.delete("/posts/:id", (req, res) => {
        const id = req.params.id;
        const condition = {"_id": new ObjectId(id)};
        db.collection("post").deleteOne(condition, (err, item) => {
            if (err) {
                res.send({"error": "Có lỗi xảy ra"});
            } else {
                res.send("Post " + id + " was deleted!");
            }
        });
    });

    //api get all document trong collection
    app.get("/posts", (req, res) => {
        db.collection("post").find({}).toArray((err, rsl) => {
            if (err) {
                res.send({"error": "Có lỗi xảy ra!"});
            } else {
                res.send(rsl);
            }
        });
    });
};