let win_width = window.innerWidth;
let win_height = window.innerHeight;

let app = new PIXI.Application({width: win_width, height: win_height, backgroundColor: 0xdedede, sharedTicker: true});
document.getElementById("root").appendChild(app.view);


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
frame.width = win_width/2;
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

let btn_base = PIXI.Sprite.from("src/images/ui/buttons_base.png");
btn_base.anchor.set(0.5);
btn_base.height = 200;
btn_base.width = frame.width/2;
btn_base.position.set(win_width/2, win_height - (win_height - frame.height)/0.7);
app.stage.addChild(btn_base);

let start = PIXI.Sprite.from("src/images/ui/play_icon.png");
start.anchor.set(0.5);
start.height = btn_base.height/2.5;
start.width = btn_base.width/4.5;
start.buttonMode = true;
start.cursor = 'pointer';
start.interactive = true;
start.on('pointerdown', play);
start.zIndex = 5;
btn_base.addChild(start)

let l_row = new PIXI.Container();
let m_row = new PIXI.Container();
let r_row = new PIXI.Container();

let symbols = ["H1", "H2", "H3", "H4", "M1", "M2", "R1", "R2", "R3", "R4", "Scatter", "Scatter_txt", "Wild", "Wild_txt"];

let textureArray;
let path1;
let path2;
let texture1;
let texture2;
let symbol;

let rows = [l_row, m_row, r_row];

for (row in rows) {
    let symbols_duplicate = [];
    while (symbols_duplicate.length < symbols.length) {
        randInt = Math.floor(Math.random() * symbols.length)
        if (!(symbols_duplicate.includes(symbols[randInt]))) {
            symbols_duplicate.push(symbols[randInt])
            console.log(symbols_duplicate)
        };
    };
    // This loop creates a vertical line of all unique symbols in a random order

    for (let i=0; i < symbols_duplicate.length; i++) {
        textureArray = [];
        path1 = "src/images/symbols/" + symbols_duplicate[i] + ".png"
        path2 = "src/images/symbols/" + symbols_duplicate[i] + "_b.png"
        texture1 = PIXI.Texture.from(path1);
        texture2 = PIXI.Texture.from(path2);
        textureArray.push(texture1, texture2);
        symbol = new PIXI.AnimatedSprite(textureArray);
        symbol.anchor.set(0.5);
        // symbol.height = 1;
        // symbol.width = 1;
        symbol.position.y = i*150;
        symbol.position.x = (win_width/2) + 150*(row - 1);
        // symbol.play();
        symbol.animationSpeed = 0.05;
        symbol.zIndex = 2
    
        rows[row].addChild(symbol)
        console.log(symbol.position.y)
        rows[row].mask = mask;
    }
}

function generateSymbol(row_num) {
    let randomInt = Math.floor(Math.random() * symbols.length);
    textureArray = [];
    path1 = "src/images/symbols/" + symbols[randomInt] + ".png"
    path2 = "src/images/symbols/" + symbols[randomInt] + "_b.png"  
    texture1 = PIXI.Texture.from(path1);
    texture2 = PIXI.Texture.from(path2);
    textureArray.push(texture1, texture2);
    symbol = new PIXI.AnimatedSprite(textureArray);
    symbol.anchor.set(0.5);
    // symbol.play();
    symbol.animationSpeed = 0.05;
    symbol.zIndex = 2

    return symbol;
}

app.stage.addChild(top_bar, logo, crow, bottom_bar)
container.addChild(frame, backdrop, mask, l_row, m_row, r_row)

let new_symbol;

let tick = PIXI.Ticker.shared;
tick.add((delta) => {
    for (slot_element in l_row.children) {
        l_row.children[slot_element].position.y = l_row.children[slot_element].position.y - delta*5.5;
        if (l_row.children[slot_element].position.y < -150) {
            // l_row.children[slot_element].position.y = 1950;
            l_row.removeChild(l_row.children[slot_element]);
            new_symbol = generateSymbol();
            new_symbol.position.y = 1950;
            new_symbol.position.x = (win_width/2) - 150;
            l_row.addChild(new_symbol)
        }
    }
    for (slot_element in m_row.children) {
        m_row.children[slot_element].position.y = m_row.children[slot_element].position.y + delta*5.5;
        if (m_row.children[slot_element].position.y > 2100) {
            m_row.removeChild(m_row.children[slot_element]);
            new_symbol = generateSymbol();
            new_symbol.position.y = 0;
            new_symbol.position.x = (win_width/2);
            m_row.addChild(new_symbol)
        }
    }
    for (slot_element in r_row.children) {
        r_row.children[slot_element].position.y = r_row.children[slot_element].position.y - delta*5.5;
        if (r_row.children[slot_element].position.y < -150) {
            r_row.removeChild(r_row.children[slot_element]);
            new_symbol = generateSymbol();
            new_symbol.position.y = 1950;
            new_symbol.position.x = (win_width/2) + 150;
            r_row.addChild(new_symbol)        
        }
    }
});

function autoPause() {
    tick.stop();
}

let play_mode = false;
function play() {
    if (play_mode == true) {
        play_mode = false;
        app.ticker.stop();
    } else {
        play_mode = true;
        console.log(play_mode)
        app.ticker.start();
    }
}