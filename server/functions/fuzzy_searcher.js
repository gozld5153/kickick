const escapeRegExp = require("lodash").escapeRegExp;

module.exports = (word) => {
  // TODO 퍼지 검색을 위한 정규표현식 만드는 함수 구현
  // (자음번호 * 588 + 모음번호 * 28 + 종성번호) + 44032('가'코드)

  function pattern_maker(character) {
    const offset = "가".charCodeAt(0);
    // 한글 모음이 있는 경우

    // 한글 초성만 있는 경우
    if (/[ㄱ-ㅎ]/.test(character)) {
      const character_obj = {
        ㄱ: "가".charCodeAt(0),
        ㄲ: "까".charCodeAt(0),
        ㄴ: "나".charCodeAt(0),
        ㄷ: "다".charCodeAt(0),
        ㄸ: "따".charCodeAt(0),
        ㄹ: "라".charCodeAt(0),
        ㅁ: "마".charCodeAt(0),
        ㅂ: "바".charCodeAt(0),
        ㅃ: "빠".charCodeAt(0),
        ㅅ: "사".charCodeAt(0),
      };
      // character_obj 에 없는 경우는 ㅅ이후인 경우이므로
      // ㅅ과 현재 초성의 차이를 구하고 * 588 + ㅅ의 코드
      // 있는 경우는 초성에 ㅏ를 붙인 음절이 시작위치
      const start =
        character_obj[character] ||
        (character.charCodeAt(0) - "ㅅ".charCodeAt(0)) * 588 +
          character_obj["ㅅ"];
      // 초성 + ㅏ 에서 초성 + ㅣ + ㅎ 까지 총 588개이므로
      const end = start + 587;
      return `[${character}\\u${start.toString(16)}-\\u${end.toString(16)}]`;
    }
    if (/[가-힣]/.test(character)) {
      const code = character.charCodeAt(0) - offset;
      // 종성이 있으면 바리에이션 x
      if (code % 28 > 0) {
        return character;
      }
      // 범위 설정
      const start = Math.floor(code / 28) * 28 + offset;
      const end = start + 27;
      return `[\\u${start.toString(16)}-\\u${end.toString(16)}]`;
    }

    return escapeRegExp(character);
  }
  // 정규식에 사용할 문자열 패턴 만듦 음절 단위 -> 단어 단위
  const pattern = word
    .split("")
    .map((character) => pattern_maker(character))
    .join("");
  return pattern;
};
