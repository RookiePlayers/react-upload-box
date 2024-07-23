function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var material = require('@mui/material');
var iconsMaterial = require('@mui/icons-material');
var ReactPlayer = _interopDefault(require('react-player'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var Alignment;
(function (Alignment) {
  Alignment["right"] = "flex-end";
  Alignment["left"] = "flex-start";
  Alignment["top"] = "flex-start";
  Alignment["bottom"] = "flex-end";
  Alignment["center"] = "center";
  Alignment["spaceBetween"] = "space-between";
  Alignment["spaceAround"] = "space-Around";
  Alignment["spaceEvenly"] = "space-evenly";
})(Alignment || (Alignment = {}));

function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded = ["startLayer", "alignment", "children", "style", "stackHeight", "stackWidth"];
var Stack = function Stack(_ref) {
  var startLayer = _ref.startLayer,
    alignment = _ref.alignment,
    children = _ref.children,
    style = _ref.style,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = React.useState(function () {
      return startLayer || 100;
    }),
    layerIndex = _useState[0],
    setLayerIndex = _useState[1];
  React.useEffect(function () {
    setLayerIndex(function (prevLayerIndex) {
      return startLayer || prevLayerIndex;
    });
  }, [startLayer]);
  return /*#__PURE__*/React__default.createElement("div", {
    style: _extends$1({}, style, {
      position: 'absolute',
      height: (style === null || style === void 0 ? void 0 : style.height) || '100%',
      width: (style === null || style === void 0 ? void 0 : style.width) || '100%'
    }),
    className: "jsk-stack jsk-stack-align-" + (alignment || '')
  }, /*#__PURE__*/React__default.createElement("div", _extends$1({}, rest, {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  }), React__default.Children.map(children, function (elem, i) {
    var _elem$props$style$poi, _elem$props, _elem$props$style, _elem$props2, _elem$props2$style;
    return elem !== null ? /*#__PURE__*/React__default.createElement("div", {
      style: {
        pointerEvents: (_elem$props$style$poi = (_elem$props = elem.props) === null || _elem$props === void 0 ? void 0 : (_elem$props$style = _elem$props.style) === null || _elem$props$style === void 0 ? void 0 : _elem$props$style.pointerEvents) != null ? _elem$props$style$poi : 'all',
        position: 'absolute',
        zIndex: layerIndex,
        width: '100%',
        height: ((_elem$props2 = elem.props) === null || _elem$props2 === void 0 ? void 0 : (_elem$props2$style = _elem$props2.style) === null || _elem$props2$style === void 0 ? void 0 : _elem$props2$style.stackHeight) || '100%'
      },
      key: (elem === null || elem === void 0 ? void 0 : elem.key) || 'stack_' + i
    }, elem) : /*#__PURE__*/React__default.createElement(Fragment, null);
  })));
};
Stack.defaultProps = {
  startLayer: 100
};

var styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  }
};

var _excluded$2 = ["children", "style", "alignment", "crossAlignment"];
var Column = function Column(props) {
  var children = props.children,
    style = props.style,
    alignment = props.alignment,
    crossAlignment = props.crossAlignment,
    rest = _objectWithoutPropertiesLoose(props, _excluded$2);
  return /*#__PURE__*/React__default.createElement("div", _extends$1({}, rest, {
    style: _extends$1({}, styles.column, style, {
      justifyContent: alignment != null ? alignment : Alignment.left,
      alignContent: crossAlignment != null ? crossAlignment : Alignment.left,
      alignItems: crossAlignment != null ? crossAlignment : Alignment.left
    })
  }), children);
};

var UploadDiv = function UploadDiv(props) {
  var _props$border, _props$placeholder, _props$border2, _props$objectFit, _props$objectFitPosit, _props$objectFit2, _props$placeholder2;
  var theme = material.useTheme();
  var fileUploadRef = React.useRef(null);
  var _useState = React.useState(props.image),
    image = _useState[0],
    setImage = _useState[1];
  var _useState2 = React.useState(props.image),
    backupImage = _useState2[0];
  var _useState3 = React.useState(false),
    error = _useState3[0],
    setError = _useState3[1];
  var _useState4 = React.useState(false),
    isSizeLimit = _useState4[0],
    setIsSizeLimit = _useState4[1];
  var handleClick = function handleClick(e) {
    e.preventDefault();
    if (!props.viewOnly && fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  React.useEffect(function () {
    setImage(props.image ? props.image !== '' ? props.image : backupImage : backupImage);
  }, [props.image]);
  var handleChange = function handleChange(e) {
    var _e$target$files;
    var fileUploaded = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    var fileReader = new FileReader();
    if (fileUploaded) {
      var _props$sizeLimit;
      if (props.video && !fileUploaded.type.includes('video')) {
        console.log('err');
        setError(true);
      } else if (fileUploaded.size > ((_props$sizeLimit = props.sizeLimit) != null ? _props$sizeLimit : 500000000)) {
        setIsSizeLimit(true);
        setError(true);
      } else if (!props.video && !fileUploaded.type.includes('image')) {
        setError(true);
      } else {
        fileReader.onload = function (e) {
          if (!e) return;
          var dataUri = fileReader.result;
          setImage(dataUri);
        };
        fileReader.readAsDataURL(fileUploaded);
        if (props.onUpload != null) props.onUpload(fileUploaded);
        setError(false);
      }
    }
  };
  return React__default.createElement(Column, {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative',
      cursor: 'pointer'
    },
    alignment: Alignment.center
  }, React__default.createElement(Stack, null, props.video ? React__default.createElement("div", {
    className: 'video-wrapper',
    style: _extends({}, props.style, {
      border: !image ? (_props$border = props.border) != null ? _props$border : "2px " + theme.palette.divider + " dashed" : '',
      width: '100%',
      height: '100%'
    }),
    onClick: handleClick
  }, !image ? !props.viewOnly && React__default.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center
  }, (_props$placeholder = props.placeholder) != null ? _props$placeholder : React__default.createElement(material.Typography, {
    variant: 'overline',
    style: {
      color: material.alpha(theme.palette.text.primary, 0.5)
    }
  }, "Upload Video File")) : React__default.createElement(ReactPlayer, {
    controls: true,
    config: {
      youtube: {
        playerVars: {
          showinfo: 1
        }
      }
    },
    width: '100%',
    height: '100%',
    url: image !== null && image !== void 0 && image.startsWith('blob:') ? image : image
  })) : React__default.createElement("div", {
    style: _extends({}, props.style, {
      border: !image ? (_props$border2 = props.border) != null ? _props$border2 : "2px " + theme.palette.divider + " dashed" : '',
      height: '100%',
      width: '100%'
    })
  }, React__default.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center,
    style: {
      width: '100%',
      height: '100%'
    },
    onClick: handleClick
  }, image || image === '' ? React__default.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React__default.createElement("img", {
    style: {
      objectFit: (_props$objectFit = props.objectFit) != null ? _props$objectFit : 'cover',
      objectPosition: (_props$objectFitPosit = props.objectFitPosition) != null ? _props$objectFitPosit : 'center center'
    },
    width: '100%',
    height: '100%',
    src: image !== null && image !== void 0 && image.startsWith('blob:') ? image : image,
    alt: 'Uploaded'
  })) : props.image ? React__default.createElement("img", {
    src: props.image,
    style: {
      height: '100%',
      width: '100%',
      objectFit: (_props$objectFit2 = props.objectFit) != null ? _props$objectFit2 : 'cover'
    },
    alt: 'Default'
  }) : !props.viewOnly && React__default.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center,
    style: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }
  }, (_props$placeholder2 = props.placeholder) != null ? _props$placeholder2 : React__default.createElement(material.Typography, {
    variant: 'overline',
    style: {
      textAlign: 'center',
      color: material.alpha(theme.palette.text.primary, 0.5)
    }
  }, "Upload Image File")))), React__default.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center,
    style: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }
  }, !props.viewOnly && props.children), !props.disableLink && React__default.createElement(Column, {
    style: {
      height: '100%',
      alignItems: 'end',
      pointerEvents: 'none'
    },
    alignment: props.video ? Alignment.top : Alignment.bottom
  }, React__default.createElement(Column, {
    style: {
      pointerEvents: 'all'
    }
  }, React__default.createElement(material.InputBase, {
    value: /^(http(s)?:\/\/(.)+)/g.test(image) ? image : '',
    startAdornment: React__default.createElement(material.InputAdornment, {
      position: 'start'
    }, React__default.createElement(iconsMaterial.LinkRounded, null)),
    endAdornment: React__default.createElement(material.InputAdornment, {
      position: 'end'
    }, React__default.createElement(material.Tooltip, {
      title: 'You must only paste valid links'
    }, React__default.createElement(iconsMaterial.InfoOutlined, null))),
    style: {
      borderRadius: 20,
      margin: 10,
      padding: '5px 15px',
      background: 'rgb(53,53,53)',
      fontSize: 12,
      pointerEvents: 'all'
    },
    onChange: function onChange(e) {
      setImage(e.target.value);
      if (props.onUpload && /^(http(s)?:\/\/(.)+)/g.test(e.target.value)) {
        props.onUpload({
          file: e.target.value,
          blob: e.target.value,
          link: e.target.value
        });
      }
    },
    inputProps: {
      style: {
        fontSize: 12
      }
    },
    placeholder: props.video ? 'Paste Video Link' : 'Paste Image URL'
  })))), React__default.createElement("input", {
    type: 'file',
    ref: fileUploadRef,
    onChange: handleChange,
    style: {
      display: 'none'
    }
  }), error && React__default.createElement(material.Typography, {
    style: {
      color: 'red',
      fontSize: '12px',
      margin: '10px'
    }
  }, isSizeLimit ? "Please upload a " + (props.video ? 'video' : 'image') + " file " + (props.sizeLimit ? 'less than (' + props.sizeLimit * 1e-6 + 'mb)' : '!') : "Please upload " + (props.video ? 'a video' : 'an image') + " file!"));
};

exports.UploadBox = UploadDiv;
//# sourceMappingURL=index.js.map
