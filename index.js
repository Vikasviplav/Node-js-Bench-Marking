var bench = require('nanobench');
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8080

bench('sha256 200.000 times', function (bnch) {

    const server = http.createServer((req, res) => {
        bnch.start()
        if (req.url == '/favicon.ico') {
            res.statusCode = 404
            res.end();
            return
        }

        if (req.url == "/") {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            res.end(`<div style="width: 29%; margin: auto; margin-top: 30px" ><h2>Benchmarking</h2><div><ul style= "font-size: 25px"><li><a href="/textsync.txt">textSync</a></li><li><a href = "/textasync.txt">textAsync</a></li><li><a href="/textstream.txt">textStream</a></li><li><a href="/fspromise.txt">fsPromise</a></li></ul></div></div>`);
            console.log("\n loading home process")
            bnch.end()
        }






        //For Small File






        // if (req.url == "/textsync.txt") {
        //     res.statusCode = 200
        //     res.setHeader('Content-Type', 'text/html');
        //     const result = fs.readFileSync("./page/smallFile.txt", { encoding: "utf8" });
        //     res.end(result);
        //     console.log("\n TextSync Process ");
        //     bnch.end();
        // }

        // if (req.url == "/textstream.txt") {
        //     res.statusCode = 200
        //     res.setHeader('Content-Type', 'text/html');
        //     let readable = fs.createReadStream("./page/smallFile.txt");
        //     readable.on('data', function (chunk) {
        //         res.end(chunk.toString());
        //     });

        //     console.log("\n TextStream Process ");
        //     bnch.end()
        // }

        // if (req.url == "/textasync.txt") {
        //     res.statusCode = 200
        //     res.setHeader('Content-Type', 'text/html');
        //     fs.readFile("./page/smallFile.txt", (err, data) => {
        //         if (err) {
        //             res.end("<h2>Something Went Wrong</h2>")
        //         } else {
        //             res.end(data.toString());
        //             console.log("\n TextAsync Process ")
        //             bnch.end()
        //         }
        //     })
        // }

        // if (req.url == "/fspromise.txt") {
        //     res.statusCode = 200
        //     res.setHeader('Content-Type', 'text/html');
        //     fs.promises.readFile("./page/smallFile.txt")
        //         .then(function (result) {
        //             res.end(result.toString());
        //             console.log("\n fsPromise Process");
        //             bnch.end();
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         })
        // }



        //for large file



        if (req.url == "/textsync.txt") {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            const result = fs.readFileSync("./page/largeFile.txt", { encoding: "utf8" });
            res.end(result);
            console.log("\n TextSync Process ");
            bnch.end();
        }

        if (req.url == "/textstream.txt") {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            let readable = fs.createReadStream("./page/largeFile.txt");
            readable.on('data', function (chunk) {
                res.end(chunk.toString());
            });

            console.log("\n TextStream Process ");
            bnch.end()
        }

        if (req.url == "/textasync.txt") {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            fs.readFile("./page/largeFile.txt", (err, data) => {
                if (err) {
                    res.end("<h2>Something Went Wrong</h2>")
                } else {
                    res.end(data.toString());
                    console.log("\n TextAsync Process ")
                    bnch.end()
                }
            })
        }

        if (req.url == "/fspromise.txt") {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html');
            fs.promises.readFile("./page/largeFile.txt")
                .then(function (result) {
                    res.end(result.toString());
                    console.log("\n fsPromise Process");
                    bnch.end();
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    })


    server.listen(port, () => {
        console.log(`Server running at port http://localhost:${port}`)
    })



})







