function unHyphenate(string) {

  let splitArr = string.split('-');

  for (let i = 0; i < splitArr.length; i++) {
    let curWord = splitArr[i];
    if (curWord === 'and') {
      continue;
    }
    curWord = curWord[0].toUpperCase() + curWord.slice(1);
    splitArr[i] = curWord;
  }

  return splitArr.join(' ');

}

export default unHyphenate; 
