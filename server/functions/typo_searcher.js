const hangul = require("hangul-js");
// const escapeRegExp = require("lodash").escapeRegExp;

module.exports = (word) => {
  // TODO 오타 검색 및 순서 변경 검색 구현
  // hangul 라이브러리 쓰는 걸로 수정

  // 오타 분기 구현
  const typo_obj = {
    // 한글 분기
    ㅂ: ["ㅈ"],
    ㅈ: ["ㅂ", "ㄷ"],
    ㄷ: ["ㅈ", "ㄱ"],
    ㄱ: ["ㄷ", "ㅅ"],
    ㅅ: ["ㄱ", "ㅛ"],
    ㅛ: ["ㅅ", "ㅕ"],
    ㅕ: ["ㅛ", "ㅑ"],
    ㅑ: ["ㅕ", "ㅐ"],
    ㅐ: ["ㅑ", "ㅔ"],
    ㅔ: ["ㅐ"],
    ㅁ: ["ㄴ"],
    ㄴ: ["ㅁ", "ㅇ"],
    ㅇ: ["ㄴ", "ㄹ"],
    ㄹ: ["ㅇ", "ㅎ"],
    ㅎ: ["ㄹ", "ㅗ"],
    ㅗ: ["ㅎ", "ㅓ"],
    ㅓ: ["ㅗ", "ㅏ"],
    ㅏ: ["ㅓ", "ㅣ"],
    ㅣ: ["ㅏ"],
    ㅋ: ["ㅌ"],
    ㅌ: ["ㅋ", "ㅊ"],
    ㅊ: ["ㅌ", "ㅍ"],
    ㅍ: ["ㅊ", "ㅠ"],
    ㅠ: ["ㅍ", "ㅜ"],
    ㅜ: ["ㅠ", "ㅡ"],
    ㅡ: ["ㅜ"],

    // 영어 분기
    q: ["w"],
    w: ["q", "e"],
    e: ["w", "r"],
    r: ["e", "t"],
    t: ["r", "y"],
    y: ["t", "u"],
    u: ["y", "i"],
    i: ["u", "o"],
    o: ["i", "p"],
    p: ["o"],
    a: ["s"],
    s: ["a", "d"],
    d: ["s", "f"],
    f: ["d", "g"],
    g: ["f", "h"],
    h: ["g", "j"],
    j: ["h", "k"],
    k: ["j", "l"],
    l: ["k"],
    z: ["x"],
    x: ["z", "c"],
    c: ["x", "v"],
    v: ["c", "b"],
    b: ["v", "n"],
    n: ["b", "m"],
    m: ["n"],
  };

  const original = hangul.d(word);
  const reordered = [];

  // type_obj 사용
  // original에 word 분리시켜서 들어가있음
  // original 순서대로 돌면서 접근

  for (let i = 0; i < original.length - 1; i++) {
    // 순서 변경
    let copy = original.slice();
    let temp = copy.splice(i, 1)[0];
    copy.splice(i + 1, 0, temp);
    reordered.push(copy);

    // 현재 문자를 typo_obj에 대치
    // typo_obj 의 값들로 대치시켜서 reordered에 push
    // 현재 문자 - copy[i]
    // copy[i]를 type_obj 에 대치시켜봄
    if (typo_obj[copy[i]]) {
      // typo_obj에 현재 값이 들어있다면 <- 한글 or 영어면
      typo_obj[copy[i]].forEach((el) => {
        let copy = original.slice();
        copy.splice(i, 1, el); // 현재위치의 값을 el로 변경
        reordered.push(copy);
      });
    }
  }
  const result = reordered.map((el) => hangul.a(el));

  return result;
};
