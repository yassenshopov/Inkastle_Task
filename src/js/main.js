let win_width = window.innerWidth;
let win_height = window.innerHeight;

let app = new PIXI.Application({width: win_width, height: win_height, backgroundColor: 0xdedede});
document.getElementById("root").appendChild(app.view);

let loader = PIXI.Loader;
loader.add("bg", "src/images/bg.png"),load(setup);

let bg = PIXI.Sprite.from("src/images/bg.png");
bg.width = win_width;
bg.position.y = - win_height/2;
// bg.height = win_height;
app.stage.addChild(bg);

let top_bar = PIXI.Sprite.from("src/images/ui/top_bar.png");
top_bar.width = bg.width;
top_bar.zIndex = 3;

let crow = PIXI.Sprite.from("src/images/ui/crow.png");
crow.anchor.set(0.5);
crow.position.set(100, (win_height/2) - 50);

let bottom_bar = PIXI.Sprite.from("src/images/ui/bottom_bar.png");
bottom_bar.width = bg.width;
bottom_bar.position.y = win_height - 26;

const container = new PIXI.Container();
app.stage.addChild(container);
container.sortableChildren = true;

let frame = PIXI.Sprite.from("src/images/ui/reel_frame.png");
frame.anchor.set(0.5);
// frame.scale.set(1.1)
frame.width = win_width/2.5;
frame.height = win_height/1.1;

frame.position.set(win_width/2, (win_height/2));
frame.zIndex = 2;

let logo = PIXI.Sprite.from("src/images/ui/logo_v2.png");
logo.anchor.set(0.5);
logo.position.set(win_width/2, (win_height - frame.height)*1.5);
logo.zIndex = 3;

let backdrop = PIXI.Sprite.from("src/images/ui/backdrop.png");
backdrop.anchor.set(0.5);
// backdrop.scale.set(1.1)
backdrop.width = frame.width/1.3;
backdrop.height = frame.height/1.5;
backdrop.position.set(win_width/2, (win_height/2) + 10);
backdrop.zIndex = 0;

const mask = new PIXI.Graphics()
    .beginFill(0x000000)
    .drawRect((backdrop.x - backdrop.width/2), (backdrop.y - backdrop.height/2), backdrop.width, backdrop.height)
    .endFill();

let symbols = ["H1", "H2", "H3", "H4", "M1", "M2", "R1", "R2", "R3", "R4", "Scatter", "Scatter_txt", "Wild", "Wild_txt"];

// symbol1.mask = mask;

// This for loop creates a vertical line of all unique symbols in a random order
let symbols_duplicate = [];
while (symbols_duplicate.length < symbols.length) {
    randInt = Math.floor(Math.random() * symbols.length)
    if (!(symbols_duplicate.includes(symbols[randInt]))) {
        symbols_duplicate.push(symbols[randInt])
        console.log(symbols_duplicate)
    };
};

let textureArray;
let path1;
let path2;
let texture1;
let texture2;
let symbol;
for (let i=0; i < symbols_duplicate.length; i++) {
    textureArray = [];
    path1 = "src/images/symbols/" + symbols_duplicate[i] + ".png"
    path2 = "src/images/symbols/" + symbols_duplicate[i] + "_b.png"
    texture1 = PIXI.Texture.from(path1);
    texture2 = PIXI.Texture.from(path2);
    textureArray.push(texture1, texture2);
    symbol = new PIXI.AnimatedSprite(textureArray);
    symbol.anchor.set(0.5);
    // symbol.scale.set(0.5)
    symbol.height = 1;
    symbol.width = 1;
    symbol.position.y = i*50;
    symbol.position.x = (win_width/2);
    symbol.play();
    symbol.animationSpeed = 0.07;
    symbol.zIndex = 2

    container.addChild(symbol)
    console.log(symbol + ":" + i)
}

app.stage.addChild(top_bar, logo, crow, bottom_bar)
container.addChild(frame, backdrop, mask)

app.ticker.add((delta) => {
    // symbol.position.y = symbol.position.y + delta*2
});

mask.alpha = 0;