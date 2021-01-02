self.addEventListener('message', (e) => {
  self.importScripts('/de4js/third_party/mathjs/math.min.js');
  self.importScripts('/de4js/lib/utils.js');

  let source = e.data.source;
  const packer = e.data.packer;
  const options = e.data.options;

  const methods = {
    evalencode: () => {
      self.importScripts('/de4js/lib/evaldecode.js');
      return EvalDecode(source);
    },
    _numberencode: () => {
      self.importScripts('/de4js/lib/numberdecode.js');
      return _NumberDecode(source);
    },
    arrayencode: () => {
      self.importScripts('/de4js/lib/arraydecode.js');
      return ArrayDecode(source, options);
    },
    jsfuck: () => {
      self.importScripts('/de4js/lib/jsfuckdecode.js');
      return JSFuckDecode(source);
    },
    obfuscatorio: () => {
      self.importScripts('/de4js/lib/obfuscatorio.js');
      return ObfuscatorIO(source, options);
    },
    cleansource: () => {
      self.importScripts('/de4js/lib/cleansource.js');
      return CleanSource(source, options);
    },
    aaencode: () => {
      self.importScripts('/de4js/third_party/cat-in-136/aadecode.js');
      return AADecode.decode(source);
    },
    jjencode: () => {
      self.importScripts('/de4js/third_party/decoder-jjencode/jjdecode.js');
      return JJdecode.decode(source);
    },
    urlencode: () => {
      self.importScripts('/de4js/third_party/js-beautify/unpackers/urlencode_unpacker.js');
      if (Urlencoded.detect(source)) return Urlencoded.unpack(source);
      throw 'Not matched';
    },
    p_a_c_k_e_r: () => {
      self.importScripts('/de4js/third_party/js-beautify/unpackers/p_a_c_k_e_r_unpacker.js');
      if (P_A_C_K_E_R.detect(source)) return P_A_C_K_E_R.unpack(source);
      throw 'Not matched';
    },
    javascriptobfuscator: () => {
      self.importScripts('/de4js/third_party/js-beautify/unpackers/javascriptobfuscator_unpacker.js');
      if (JavascriptObfuscator.detect(source)) return JavascriptObfuscator.unpack(source);
      throw 'Not matched';
    },
    myobfuscate: () => {
      self.importScripts('/de4js/third_party/js-beautify/unpackers/myobfuscate_unpacker.js');
      if (MyObfuscate.detect(source)) return MyObfuscate.unpack(source);
      throw 'Not matched';
    },
  };

  try {
    source = methods[packer]();
  } catch (err) {
    throw new Error(err);
  }

  self.postMessage(source);
});
