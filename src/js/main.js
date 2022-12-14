let win_width = window.innerWidth;
let win_height = window.innerHeight;

let screen_width = screen.width;

let mobile_mode = false;
if (screen_width < 800) {
  mobile_mode = true;
}

let app = new PIXI.Application({
  width: win_width,
  height: win_height,
  backgroundColor: 0xdedede,
  sharedTicker: true,
});
document.getElementById('root').appendChild(app.view);

let bg_width;
let tb_width;
let bb_width;
let frame_width;
let frame_height;
let frame_y;
let crow_x;
let crow_y;
if (mobile_mode) {
  bg_width = win_height;
  tb_width = screen_width;
  bb_width = screen_width;
  frame_width = win_width * 1.1;
  frame_height = frame_width * 1.2;
  frame_y = win_height / 10;
  crow_x = win_width / 6;
  crow_y = win_height / 10;
  symbols_offset = frame_width / 1.3 / 3.2 / 2; //symbol_height/2
} else {
  bg_width = win_width;
  tb_width = bg_width;
  bb_width = bg_width;
  frame_width = win_width * 0.4;
  frame_height = frame_width * 1.05;
  frame_y = win_height / 10;
  crow_x = win_width / 5;
  crow_y = win_height / 2;
  symbols_offset = frame_width / 1.3 / 3.2 / 4; //symbol_height/4
}

let bg = PIXI.Sprite.from('src/images/bg.png');
bg.width = bg_width;
bg.height = bg.width;
bg.anchor.set(0.5);
bg.position.x = win_width / 2;
bg.position.y = win_height / 2;
app.stage.addChild(bg);

let top_bar = PIXI.Sprite.from('src/images/ui/top_bar.png');
top_bar.width = tb_width;
top_bar.height = top_bar.width * 0.01669595782;
top_bar.zIndex = 3;
top_bar.anchor.set(0.5);
top_bar.position.x = win_width / 2;
top_bar.position.y = top_bar.height / 2;

let bottom_bar = PIXI.Sprite.from('src/images/ui/bottom_bar.png');
bottom_bar.width = bb_width;
bottom_bar.height = bottom_bar.width * 0.01669595782;
bottom_bar.anchor.set(0.5);
bottom_bar.position.x = win_width / 2;
bottom_bar.position.y = win_height - bottom_bar.height / 2;

const container = new PIXI.Container();
app.stage.addChild(container);
container.sortableChildren = true;

let frame = PIXI.Sprite.from('src/images/ui/reel_frame.png');
frame.anchor.set(0.5);
frame.width = frame_width;
frame.height = frame_height;
frame.position.set(win_width / 2, win_height / 2 - frame_y);
frame.zIndex = 2;

let logo = PIXI.Sprite.from('src/images/ui/logo_v2.png');
logo.anchor.set(0.5);
logo.scale.set(0.8);
logo.position.set(win_width / 2, win_height / 2 - frame.position.y);
logo.zIndex = 3;

let backdrop = PIXI.Sprite.from('src/images/ui/backdrop.png');
backdrop.anchor.set(0.5);
backdrop.width = frame.width / 1.3;
backdrop.height = frame.height / 1.5;
backdrop.position.set(win_width / 2, frame.position.y);
backdrop.zIndex = 0;

let crow = PIXI.Sprite.from('src/images/ui/crow.png');
crow.anchor.set(0.5);
crow.width = backdrop.width / 5;
crow.height = crow.width * 1.8;
crow.position.set(crow_x, crow_y);

const mask = new PIXI.Graphics()
  .beginFill(0x000000)
  .drawRect(
    backdrop.x - backdrop.width / 2,
    backdrop.y - backdrop.height / 2,
    backdrop.width,
    backdrop.height
  )
  .endFill();

let btn_base = PIXI.Sprite.from('src/images/ui/buttons_base.png');
btn_base.anchor.set(0.5);
btn_base.width = frame.width * 0.8;
btn_base.height = btn_base.width * 0.6;
btn_base.position.set(win_width / 2, win_height - frame.position.y * 0.5);
app.stage.addChild(btn_base);

let start = PIXI.Sprite.from('src/images/ui/play_icon.png');
start.anchor.set(0.5);
start.height = btn_base.height / 3;
start.width = start.height * 0.944906445;
start.buttonMode = true;
start.cursor = 'pointer';
start.interactive = true;
start.on('pointerdown', play);
start.zIndex = 5;
btn_base.addChild(start);

let l_col = new PIXI.Container();
let m_col = new PIXI.Container();
let r_col = new PIXI.Container();

let symbols = [
  'H1',
  'H2',
  'H3',
  'H4',
  'M1',
  'M2',
  'R1',
  'R2',
  'R3',
  'R4',
  'Scatter',
  'Scatter_txt',
  'Wild',
  'Wild_txt',
];

let textureArray;
let path1;
let path2;
let texture1;
let texture2;
let symbol;
let symbol_height = backdrop.width / 3.2;
let sym_origin_up;
let sym_origin_down;
let default_positions = [];

let columns = [l_col, m_col, r_col];

for (row in columns) {
  let symbols_duplicate = [];
  while (symbols_duplicate.length < symbols.length) {
    randInt = Math.floor(Math.random() * symbols.length);
    if (!symbols_duplicate.includes(symbols[randInt])) {
      symbols_duplicate.push(symbols[randInt]);
    }
  }
  // This loop creates a vertical line of all unique symbols in a random order
  for (let i = 0; i < symbols_duplicate.length; i++) {
    textureArray = [];
    path1 = 'src/images/symbols/' + symbols_duplicate[i] + '.png';
    path2 = 'src/images/symbols/' + symbols_duplicate[i] + '_b.png';
    texture1 = PIXI.Texture.from(path1);
    texture2 = PIXI.Texture.from(path2);
    textureArray.push(texture1, texture2);
    symbol = new PIXI.AnimatedSprite(textureArray);
    symbol.height = symbol_height;
    symbol.width = symbol.height;
    symbol.anchor.set(0.5);
    symbol.position.y =
      (i - Math.floor(symbols_duplicate.length / 2.5)) * symbol.height +
      (frame.position.y - frame_height / 2) +
      symbols_offset;
    if (!default_positions.includes(symbol.position.y)) {
      default_positions.push(symbol.position.y);
    }
    sym_origin_up = default_positions[0];
    sym_origin_down = default_positions[default_positions.length - 1];
    symbol.position.x = win_width / 2 + symbol.width * (row - 1);
    symbol.zIndex = 2;

    columns[row].addChild(symbol);
    columns[row].mask = mask;
  }
}

function generateSymbol(row_num) {
  let randomInt = Math.floor(Math.random() * symbols.length);
  textureArray = [];
  path1 = 'src/images/symbols/' + symbols[randomInt] + '.png';
  path2 = 'src/images/symbols/' + symbols[randomInt] + '_b.png';
  texture1 = PIXI.Texture.from(path1);
  texture2 = PIXI.Texture.from(path2);
  textureArray.push(texture1, texture2);
  symbol = new PIXI.AnimatedSprite(textureArray);
  symbol.anchor.set(0.5);
  symbol.width = symbol_height;
  symbol.height = symbol.width;
  symbol.zIndex = 2;
  return symbol;
}

app.stage.addChild(top_bar, logo, crow, bottom_bar);
container.addChild(frame, backdrop, mask, l_col, m_col, r_col);

let new_symbol;
let move_mode = false;
let speed_change = true;
let tick = PIXI.Ticker.shared;
let delta_num = 0;
let step = symbol_height / 180; //Step is 1/180th of the height of an individual symbol
tick.add((delta) => {
  if (move_mode) {
    for (slot_element in l_col.children) {
      l_col.children[slot_element].position.y =
        l_col.children[slot_element].position.y - step * 24;
      if (l_col.children[slot_element].position.y < sym_origin_up) {
        l_col.removeChild(l_col.children[slot_element]);
        new_symbol = generateSymbol();
        new_symbol.position.y = sym_origin_down;
        new_symbol.position.x = win_width / 2 - new_symbol.width;
        l_col.addChild(new_symbol);
      }
    }
    for (slot_element in m_col.children) {
      m_col.children[slot_element].position.y =
        m_col.children[slot_element].position.y + step * 24;
      if (m_col.children[slot_element].position.y > sym_origin_down) {
        m_col.removeChild(m_col.children[slot_element]);
        new_symbol = generateSymbol();
        new_symbol.position.y = sym_origin_up;
        new_symbol.position.x = win_width / 2;
        m_col.addChild(new_symbol);
      }
    }
    for (slot_element in r_col.children) {
      r_col.children[slot_element].position.y =
        r_col.children[slot_element].position.y - step * 24;
      if (r_col.children[slot_element].position.y < sym_origin_up) {
        r_col.removeChild(r_col.children[slot_element]);
        new_symbol = generateSymbol();
        new_symbol.position.y = sym_origin_down;
        new_symbol.position.x = win_width / 2 + new_symbol.width;
        r_col.addChild(new_symbol);
      }
    }
  }
});

let play_mode = false;
function play() {
  // Mechanism to restore alpha of all symbols
  for (symbol in l_col.children) {
    l_col.children[symbol].alpha = 1;
    l_col.children[symbol].stop();
    m_col.children[symbol].alpha = 1;
    m_col.children[symbol].stop();
    r_col.children[symbol].alpha = 1;
    r_col.children[symbol].stop();
  }
  speed_change = true;
  if (play_mode == true) {
    play_mode = false;
  } else {
    play_mode = true;
    move_mode = true;

    setTimeout(() => {
      speed_change = false;
      tick.speed = 1;
      move_mode = false;
      let index_min;

      // Mechanism to check whether tiles align
      for (symbol in l_col.children) {
        for (col in columns) {
          // The position_y of every symbol is compared with the values in default_positions
          // The closest one is chosen
          let differences = [];
          for (position_y in default_positions) {
            differences.push(
              Math.abs(
                columns[col].children[symbol].position.y -
                  default_positions[position_y]
              )
            );
          }
          let min_value = Math.min(...differences);
          index_min = differences.indexOf(min_value);
          columns[col].children[symbol].position.y =
            default_positions[index_min];
        }
      }

      // Mechanism to check which symbols "win"
      for (symbol in l_col.children) {
        if (
          l_col.children[symbol].position.y ==
          default_positions[Math.floor(symbols.length / 2)]
        ) {
          l_col.children[symbol].play();
          l_col.children[symbol].animationSpeed = 0.05;
        } else {
          l_col.children[symbol].alpha = 0.5;
        }

        if (
          m_col.children[symbol].position.y ==
          default_positions[Math.floor(symbols.length / 2)]
        ) {
          m_col.children[symbol].play();
          m_col.children[symbol].animationSpeed = 0.05;
        } else {
          m_col.children[symbol].alpha = 0.5;
        }

        if (
          r_col.children[symbol].position.y ==
          default_positions[Math.floor(symbols.length / 2)]
        ) {
          r_col.children[symbol].play();
          r_col.children[symbol].animationSpeed = 0.05;
        } else {
          r_col.children[symbol].alpha = 0.5;
        }
      }
    }, 1500);
  }
}
