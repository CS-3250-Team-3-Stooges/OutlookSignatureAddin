const devCerts = require("office-addin-dev-certs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");
const urlDev="https://localhost:3000/";
const urlProd="https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const buildType = dev ? "dev" : "prod";
  const config = {
    devtool: "source-map",
    entry: {
      polyfill: "@babel/polyfill",
      taskpane: "./src/taskpane/taskpane.js",
      commands: "./src/commands/commands.js",
      dialog: "./src/settings/dialog.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".html", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", 
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: "file-loader",
          options: {
            name: '[path][name].[ext]',          
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane/taskpane.html",
        chunks: ["polyfill", "taskpane"]
      }),
      new CopyWebpackPlugin({
        patterns: [
        {
          to: "taskpane.css",
          from: "./src/taskpane/taskpane.css"
        },
        {
          to: "dialog.css",
          from: "./src/settings/dialog.css"
        },
        {
          to: "[name]." + buildType + ".[ext]",
          from: "manifest*.xml",
          transform(content) {
            if (dev) {
              return content;
            } else {
              return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
            }
          }
        }
      ]}),
      new HtmlWebpackPlugin({
        filename: "commands.html",
        template: "./src/commands/commands.html",
        chunks: ["polyfill", "commands"]
      }),
      new HtmlWebpackPlugin({
        filename: "dialog.html",
        template: "./src/settings/dialog.html",
        chunks: ["polyfill", "dialog"]
      })
    ],
    devServer: {
      setup: function (app, server) {
        app.get('/signature', function (req, res) {
          // Code for reading with fs by sean
          var sigs = fs.readFileSync("assets/signatures.txt").toString();

    
          res.send(sigs);
        }),
        app.get('/set-signature', function (req, res) {
          // Code for reading with fs by sean
          var newSignature = req.param("newSignature");

          // Code from philip
          fs.appendFile("assets/signatures.txt", '\n' + newSignature, (err) =>
          {
            if (err) {
              console.log(err);
            }
            else {
              var sigs = fs.readFileSync("assets/signatures.txt").toString();

              console.log(sigs);
              res.send(sigs);
            }
          });
        }),
        // written by philip with help from jose and weston
        app.get('/delete-signature', function (req, res) {
          var signatures = fs.readFileSync("assets/signatures.txt").toString();
          
          signatures = signatures.split('\n');

          var signatureID = req.param("deleteSignature");

          if(signatureID){
          signatures.splice(signatureID,1);
          fs.writeFile("assets/logs.txt", signatures.length.toString(), function(err){});
          
          var lengthVar = signatures.length;
          var i = 0;
          var stringSignature = "";
          signatures.splice(signatures.length, 1);
          while (i < signatures.length){
            if(i < lengthVar - 1)
            {
                stringSignature = stringSignature + signatures[i] + "\n";
                i++;
              
          } 
           else
            {
              stringSignature = stringSignature + signatures[i];
              i++;
              lengthVar = lengthVar - 1;
           }
          }

          fs.writeFile("assets/signatures.txt", stringSignature, function(err) {
            if (err)
              console.log(err);
            else{
              signatures = fs.readFileSync("assets/signatures.txt").toString();
              console.log(signatures);
              res.send(signatures);
            }
          });
          console.log(stringSignature);
        }
          });
        
      },
      headers: {
        "Access-Control-Allow-Origin": "*"
      },      
      https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  };

  return config;
};
