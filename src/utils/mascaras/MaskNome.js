export const MaskNome = (value) => {
  const words = value.split(' ');

  const formattedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return '';
  });

  return formattedWords.join(' ');
};
