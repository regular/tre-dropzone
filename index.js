const h = require('mutant/html-element')
const setStyle = require('module-styles')('tre-dropzone')

setStyle(`
  .tre-dropzone {
    width: min-content;
    height: min-content;
    box-shadow: 0 0 1px 2px red;
    pointer-events: all;
  }
  .tre-dropzone.drag {
    box-shadow: 0 0 1px 2px gold;
  }
  .tre-dropzone .drag *,
  .tre-dropzone.drag * {
    pointer-events: none;
  }
`)

function obj(opts) {
  const ctx = opts.ctx || {}
  return {
    'ev-dragenter': e => {
      e.target.classList.add('drag')
      e.stopPropagation()
    },
    'ev-dragleave': e => {
      e.target.classList.remove('drag')
      e.stopPropagation()
    },
    'ev-dragover': e => {
      e.dataTransfer.dropEffect = 'all'
      e.preventDefault()
      e.stopPropagation()
    },
    'ev-drop': e => {
      e.preventDefault()
      e.stopPropagation()
      e.target.classList.remove('drag')
      if (opts.on_drop) {
        opts.on_drop({
          ctx,
          dataTransfer: e.dataTransfer
        })
      }
      if (opts.on_file_drop) {
        const files = [].slice.apply(
          e.dataTransfer.files
        )
        files.forEach(opts.on_file_drop)
      }
    }
  }
}

module.exports = function dropzone(opts, children) {
  return h('div.tre-dropzone', obj(opts), children)
}
module.exports.obj = obj

