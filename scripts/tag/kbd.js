function kbd(args, content) {
  return `<kbd>${args[0]}</kbd>`;
}

hexo.extend.tag.register('kbd', kbd, { ends: false })