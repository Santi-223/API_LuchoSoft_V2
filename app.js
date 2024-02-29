import App from "./Index";

const main = () =>{
    App.listen(App.get("port"));
    console.log(`Server on port ${App.get("port")}`);
};

main();
