/* Configuracion de Webpack Produccion*/

// Importamos el plugin
// Para que extraiga el HTml al dist
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Para que extraiga el CSS global al dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Para que extraiga los recursos estaticos (asstes)
const CopyPlugin = require("copy-webpack-plugin");

// Minimizar y ofuscar el codigo CSS (Produccion)
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// (Produccion)
const TerserPlugin = require("terser-webpack-plugin");


//Modulo que se va a exportar
module.exports = {

    // Por defecto esta en modo produccion
    mode: 'production',

    output: {
        // Limpia, borra todo y lo vuelve a crear
        clean: true,
        // Ponerle hash al main.js
        filename: 'main.[contenthash].js',
    },

    module: {
        
        // Reglas
        rules: [
            
            {
                /* 
                    Babel va a barrer todos cada uno de los archivos JS
                    y los va a traducir a  JS antiguo (- ES5)
                */ 
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            
            {
                // Expresión Regular
                // Va a barrer con todos los archivos y va a encontrar los html
                test: /\.html$/,

                // Si encuentra llamo al Loader
                loader: 'html-loader',

                // Si el html tiene otro archivo como una img, no la mueve de forma automatica 
                options: {
                    sources: false
                }
            },

            {
                // Va hacer lo mismo per con los archivos de CSS
                // Importar archivos de css como si fueran de js
                // Al hacer el run build transforma el css en js
                test: /\.css$/,
                // Va excluir el archivo global de CSS
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },

            {
                // Para un archivo global de CSS
                // Va buscar especificamente ese archivo
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

            // Para archivos png
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            }
        ]
    },
    
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },

    plugins: [
        /* 
            Nueva instacia del Plugin 
            Este plugin se utiliza para que envie el HTML al build
            Pero por defecto solo manda el HTML con el script del main.js
            Ninguna etiqueta va a ser enviada
        */
        // POR DEFAULT
        //new HtmlWebpackPlugin()

        // Le mando parametros
        new HtmlWebpackPlugin({
            
            // Titulo
            title: 'Webpack Con Plugin',

            // Nombre de salida (Opcional)
            filename: 'index.html',

            // En que archivo se va a basar el html del build
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            // Que use el mismo nombre
            // Se genera un [fullhash] que va a ir cambiando cada vez que yo ejecute run build
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                // De donde a donde lo va a copiar
                { from: "src/assets/", to: "assets/" },
              ],
        }),
    
    ]

}