(function() {
    function patchMonaco() {
      if (window.monaco && monaco.editor && typeof monaco.editor.create === 'function') {
        const originalCreate = monaco.editor.create;
        monaco.editor.create = function(container, options, override) {
          const editor = originalCreate.apply(this, arguments);
          container.__monacoEditorInstance = editor;
          return editor;
        };
      } else {
        setTimeout(patchMonaco, 100);
      }
    }
    patchMonaco();
  })();
  