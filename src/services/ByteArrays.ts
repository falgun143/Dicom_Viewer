
interface ByteArray {
    [index: number]: number;
}

const ByteArrays = (byteCharacters: string): ByteArray[] => {
    const byteArrays: ByteArray[] = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice: string = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers: number[] = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return byteArrays;
}

export default ByteArrays