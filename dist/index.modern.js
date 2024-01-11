import React, { useState, useEffect, useRef } from 'react';
import { useTheme, Typography, alpha, InputBase, InputAdornment, Tooltip } from '@mui/material';
import { LinkRounded, InfoOutlined } from '@mui/icons-material';
import ReactPlayer from 'react-player';

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
  var _useState = useState(function () {
      return startLayer || 100;
    }),
    layerIndex = _useState[0],
    setLayerIndex = _useState[1];
  useEffect(function () {
    setLayerIndex(function (prevLayerIndex) {
      return startLayer || prevLayerIndex;
    });
  }, [startLayer]);
  return /*#__PURE__*/React.createElement("div", {
    style: _extends$1({}, style, {
      position: 'absolute',
      height: (style === null || style === void 0 ? void 0 : style.height) || '100%',
      width: (style === null || style === void 0 ? void 0 : style.width) || '100%'
    }),
    className: "jsk-stack jsk-stack-align-" + (alignment || '')
  }, /*#__PURE__*/React.createElement("div", _extends$1({}, rest, {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  }), React.Children.map(children, function (elem, i) {
    var _elem$props$style$poi, _elem$props, _elem$props$style, _elem$props2, _elem$props2$style;
    return elem !== null ? /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: (_elem$props$style$poi = (_elem$props = elem.props) === null || _elem$props === void 0 ? void 0 : (_elem$props$style = _elem$props.style) === null || _elem$props$style === void 0 ? void 0 : _elem$props$style.pointerEvents) != null ? _elem$props$style$poi : 'all',
        position: 'absolute',
        zIndex: layerIndex,
        width: '100%',
        height: ((_elem$props2 = elem.props) === null || _elem$props2 === void 0 ? void 0 : (_elem$props2$style = _elem$props2.style) === null || _elem$props2$style === void 0 ? void 0 : _elem$props2$style.stackHeight) || '100%'
      },
      key: (elem === null || elem === void 0 ? void 0 : elem.key) || 'stack_' + i
    }, elem) : /*#__PURE__*/React.createElement(Fragment, null);
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
  return /*#__PURE__*/React.createElement("div", _extends$1({}, rest, {
    style: _extends$1({}, styles.column, style, {
      justifyContent: alignment != null ? alignment : Alignment.left,
      alignContent: crossAlignment != null ? crossAlignment : Alignment.left,
      alignItems: crossAlignment != null ? crossAlignment : Alignment.left
    })
  }), children);
};
//# sourceMappingURL=index.modern.js.map

var UploadDiv = function UploadDiv(props) {
  var _props$border, _props$placeholder, _props$border2, _props$objectFit, _props$objectFitPosit, _props$objectFit2, _props$placeholder2;
  var theme = useTheme();
  var fileUploadRef = useRef(null);
  var _useState = useState(props.image),
    image = _useState[0],
    setImage = _useState[1];
  var _useState2 = useState(props.image),
    backupImage = _useState2[0];
  var _useState3 = useState(false),
    error = _useState3[0],
    setError = _useState3[1];
  var _useState4 = useState(false),
    isSizeLimit = _useState4[0],
    setIsSizeLimit = _useState4[1];
  var handleClick = function handleClick(e) {
    console.log('hey');
    e.preventDefault();
    if (!props.viewOnly && fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  useEffect(function () {
    console.log('----->>', props.image ? 'Image Available' : 'No Image');
    setImage(props.image ? props.image !== '' ? props.image : backupImage : backupImage);
  }, [props.image]);
  var handleChange = function handleChange(e) {
    var _e$target$files;
    var fileUploaded = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    var fileReader = new FileReader();
    console.log('====================================');
    console.log(fileUploaded);
    console.log('====================================');
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
  return React.createElement(Column, {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative',
      cursor: 'pointer'
    },
    alignment: Alignment.center
  }, React.createElement(Stack, null, props.video ? React.createElement("div", {
    className: 'video-wrapper',
    style: _extends({}, props.style, {
      border: !image ? (_props$border = props.border) != null ? _props$border : "2px " + theme.palette.divider + " dashed" : '',
      width: '100%',
      height: '100%'
    }),
    onClick: handleClick
  }, !image ? !props.viewOnly && React.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center
  }, (_props$placeholder = props.placeholder) != null ? _props$placeholder : React.createElement(Typography, {
    variant: 'overline',
    style: {
      color: alpha(theme.palette.text.primary, 0.5)
    }
  }, "Upload Video File")) : React.createElement(ReactPlayer, {
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
  })) : React.createElement("div", {
    style: _extends({}, props.style, {
      border: !image ? (_props$border2 = props.border) != null ? _props$border2 : "2px " + theme.palette.divider + " dashed" : '',
      height: '100%',
      width: '100%'
    })
  }, React.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center,
    style: {
      width: '100%',
      height: '100%'
    },
    onClick: handleClick
  }, image || image === '' ? React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement("img", {
    style: {
      objectFit: (_props$objectFit = props.objectFit) != null ? _props$objectFit : 'cover',
      objectPosition: (_props$objectFitPosit = props.objectFitPosition) != null ? _props$objectFitPosit : 'center center'
    },
    width: '100%',
    height: '100%',
    src: image !== null && image !== void 0 && image.startsWith('blob:') ? image : image,
    alt: 'Uploaded'
  })) : props.image ? React.createElement("img", {
    src: props.image,
    style: {
      height: '100%',
      width: '100%',
      objectFit: (_props$objectFit2 = props.objectFit) != null ? _props$objectFit2 : 'cover'
    },
    alt: 'Default'
  }) : !props.viewOnly && React.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center,
    style: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }
  }, (_props$placeholder2 = props.placeholder) != null ? _props$placeholder2 : React.createElement(Typography, {
    variant: 'overline',
    style: {
      textAlign: 'center',
      color: alpha(theme.palette.text.primary, 0.5)
    }
  }, "Upload Image File")))), React.createElement(Column, {
    alignment: Alignment.center,
    crossAlignment: Alignment.center,
    style: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }
  }, !props.viewOnly && props.children), !props.disableLink && React.createElement(Column, {
    style: {
      height: '100%',
      alignItems: 'end',
      pointerEvents: 'none'
    },
    alignment: props.video ? Alignment.top : Alignment.bottom
  }, React.createElement(Column, {
    style: {
      pointerEvents: 'all'
    }
  }, React.createElement(InputBase, {
    value: /^(http(s)?:\/\/(.)+)/g.test(image) ? image : '',
    startAdornment: React.createElement(InputAdornment, {
      position: 'start'
    }, React.createElement(LinkRounded, null)),
    endAdornment: React.createElement(InputAdornment, {
      position: 'end'
    }, React.createElement(Tooltip, {
      title: 'You must only paste valid links'
    }, React.createElement(InfoOutlined, null))),
    style: {
      borderRadius: 20,
      margin: 10,
      padding: '5px 15px',
      background: 'rgb(53,53,53)',
      fontSize: 12,
      pointerEvents: 'all'
    },
    onChange: function onChange(e) {
      console.log(e.target.value);
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
  })))), React.createElement("input", {
    type: 'file',
    ref: fileUploadRef,
    onChange: handleChange,
    style: {
      display: 'none'
    }
  }), error && React.createElement(Typography, {
    style: {
      color: 'red',
      fontSize: '12px',
      margin: '10px'
    }
  }, isSizeLimit ? "Please upload a " + (props.video ? 'video' : 'image') + " file " + (props.sizeLimit ? 'less than (' + props.sizeLimit * 1e-6 + 'mb)' : '!') : "Please upload " + (props.video ? 'a video' : 'an image') + " file!"));
};

export { UploadDiv as UploadBox };
//# sourceMappingURL=index.modern.js.map
