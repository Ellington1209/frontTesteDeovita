export const MaskUsuario = (value) => {
  // Remove espaços usando expressão regular
  const noSpaces = value.replace(/\s+/g, "");

  // Opcional: Transforma tudo para minúsculas
  const formattedUsername = noSpaces.toLowerCase();

  return formattedUsername;
};
