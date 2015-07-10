(function (g) {
    "function" === typeof define && define.amd ? define(["jquery"], g) : g(jQuery)
})(function (g) {
    if (!g.support.cors && g.ajaxTransport && window.XDomainRequest) {
        var k = /^https?:\/\//i,
            d = /^get|post$/i,
            a = new RegExp("^" + location.protocol, "i");
        g.ajaxTransport("* text html xml json", function (b, c, h) {
            if (b.crossDomain && b.async && d.test(b.type) && k.test(b.url) && a.test(b.url)) {
                var f = null;
                return {
                    send: function (a, d) {
                        var e = "",
                            l = (c.dataType || "").toLowerCase();
                        f = new XDomainRequest;
                        /^\d+$/.test(c.timeout) && (f.timeout = c.timeout);
                        f.ontimeout = function () {
                            d(500, "timeout")
                        };
                        f.onload = function () {
                            var a = "Content-Length: " + f.responseText.length + "\r\nContent-Type: " + f.contentType,
                                b = 200,
                                c = "success",
                                e = {
                                    text: f.responseText
                                };
                            try {
                                if ("html" === l || /text\/html/i.test(f.contentType)) e.html = f.responseText;
                                else if ("json" === l || "text" !== l && /\/json/i.test(f.contentType)) try {
                                    e.json = g.parseJSON(f.responseText)
                                } catch (n) {
                                    b = 500, c = "parseerror"
                                } else if ("xml" === l || "text" !== l && /\/xml/i.test(f.contentType)) {
                                    var h = new ActiveXObject("Microsoft.XMLDOM");
                                    h.async = !1;
                                    try {
                                        h.loadXML(f.responseText)
                                    } catch (k) {
                                        h = void 0
                                    }
                                    if (!h || !h.documentElement || h.getElementsByTagName("parsererror").length) throw b = 500, c = "parseerror", "Invalid XML: " + f.responseText;
                                    e.xml = h
                                }
                            } catch (m) {
                                throw m;
                            } finally {
                                d(b, c, e, a)
                            }
                        };
                        f.onprogress = function () { };
                        f.onerror = function () {
                            d(500, "error", {
                                text: f.responseText
                            })
                        };
                        c.data && (e = "string" === g.type(c.data) ? c.data : g.param(c.data));
                        f.open(b.type, b.url);
                        f.send(e)
                    },
                    abort: function () {
                        f && f.abort()
                    }
                }
            }
        })
    }
});

function inherit(g, k) {
    var d = function () { };
    d.prototype = k.prototype;
    g.prototype = new d;
    g.prototype.constructor = g;
    g.prototype.superclass = k
}
(function () {
    function g(a) {
        "hideSymbolSearch enabledStudies enabledDrawings disabledDrawings disabledStudies disableLogo hideSideToolbar".split(" ").map(function (b) {
            a[b] && console.warn("Feature `" + b + "` is obsolete. Please see the doc for details.")
        })
    }
    if (!window.TradingView) {
        var k = {
            mobile: {
                disabledFeatures: "left_toolbar header_widget timeframes_toolbar edit_buttons_in_legend context_menus control_bar border_around_the_chart".split(" "),
                enabledFeatures: ["narrow_chart_enabled"]
            }
        },
            d = {
                BARS: 0,
                CANDLES: 1,
                LINE: 2,
                AREA: 3,
                HEIKEN_ASHI: 8,
                HOLLOW_CANDLES: 9,
                version: function () {
                    return "1.2 (internal id b9174b06 @ 2015-07-02 09:49:35.539000)"
                },
                gEl: function (a) {
                    return document.getElementById(a)
                },
                gId: function () {
                    return "tradingview_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1)
                },
                onready: function (a) {
                    window.addEventListener ? window.addEventListener("DOMContentLoaded", a, !1) : window.attachEvent("onload", a)
                },
                css: function (a) {
                    var b = document.getElementsByTagName("head")[0],
                        c = document.createElement("style");
                    c.type = "text/css";
                    c.styleSheet ? c.styleSheet.cssText = a : (a = document.createTextNode(a), c.appendChild(a));
                    b.appendChild(c)
                },
                bindEvent: function (a, b, c) {
                    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
                },
                unbindEvent: function (a, b, c) {
                    a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
                },
                widget: function (a) {
                    this.id = d.gId();
                    if (!a.datafeed) throw "Datafeed is not defined";
                    var b = {
                        width: 800,
                        height: 500,
                        symbol: "AA",
                        interval: "D",
                        timezone: "",
                        container: "",
                        path: "",
                        locale: "en",
                        toolbar_bg: void 0,
                        hideSymbolSearch: !1,
                        hideSideToolbar: !1,
                        enabledStudies: [],
                        enabledDrawings: [],
                        disabledDrawings: [],
                        disabledStudies: [],
                        drawingsAccess: void 0,
                        studiesAccess: void 0,
                        widgetbar: {
                            datawindow: !1,
                            details: !1,
                            watchlist: !1,
                            watchlist_settings: {
                                default_symbols: []
                            }
                        },
                        overrides: {
                            "mainSeriesProperties.showCountdown": !1
                        },
                        studiesOverrides: {},
                        fullscreen: !1,
                        disabledFeatures: [],
                        enabledFeatures: [],
                        indicators_file_name: null,
                        debug: !1,
                        time_frames: [{
                            text: "5y",
                            resolution: "W"
                        }, {
                            text: "1y",
                            resolution: "W"
                        }, {
                            text: "6m",
                            resolution: "120"
                        }, {
                            text: "3m",
                            resolution: "60"
                        }, {
                            text: "1m",
                            resolution: "30"
                        }, {
                            text: "5d",
                            resolution: "5"
                        }, {
                            text: "1d",
                            resolution: "1"
                        }],
                        client_id: "0",
                        user_id: "0",
                        charts_storage_url: void 0,
                        logo: {},
                        favorites: {
                            intervals: [],
                            chartTypes: []
                        }
                    },
                        c = {
                            width: a.width,
                            height: a.height,
                            symbol: a.symbol,
                            interval: a.interval,
                            timezone: a.timezone,
                            container: a.container_id,
                            path: a.library_path,
                            locale: a.locale,
                            toolbar_bg: a.toolbar_bg,
                            hideSymbolSearch: a.hide_symbol_search || a.hideSymbolSearch,
                            hideSideToolbar: a.hide_side_toolbar,
                            enabledStudies: a.enabled_studies,
                            disabledStudies: a.disabled_studies,
                            enabledDrawings: a.enabled_drawings,
                            disabledDrawings: a.disabled_drawings,
                            drawingsAccess: a.drawings_access,
                            studiesAccess: a.studies_access,
                            widgetbar: a.widgetbar,
                            overrides: a.overrides,
                            studiesOverrides: a.studies_overrides,
                            savedData: a.saved_data || a.savedData,
                            snapshotUrl: a.snapshot_url,
                            uid: this.id,
                            datafeed: a.datafeed,
                            disableLogo: a.disable_logo || a.disableLogo,
                            logo: a.logo,
                            fullscreen: a.fullscreen,
                            disabledFeatures: a.disabled_features,
                            enabledFeatures: a.enabled_features,
                            indicators_file_name: a.indicators_file_name,
                            debug: a.debug,
                            client_id: a.client_id,
                            user_id: a.user_id,
                            charts_storage_url: a.charts_storage_url,
                            favorites: a.favorites
                        };
                    g(c);
                    this.options = $.extend(!0, b, c);
                    this.options.time_frames = a.time_frames || b.time_frames;
                    a.preset && (a = a.preset, k[a] ? (a = k[a], this.options.disabledFeatures = 0 < this.options.disabledFeatures.length ? this.options.disabledFeatures.concat(a.disabledFeatures) : a.disabledFeatures, this.options.enabledFeatures = 0 < this.options.enabledFeatures.length ? this.options.enabledFeatures.concat(a.enabledFeatures) :
                        a.enabledFeatures) : console.warn("Unknown preset: `" + a + "`"));
                    this._ready_handlers = [];
                    this.create()
                }
            };
        d.widget.prototype = {
            _messageTarget: function () {
                return d.gEl(this.id).contentWindow
            },
            _autoResizeChart: function () {
                this.options.fullscreen && $(d.gEl(this.id)).css("height", $(window).height() + "px")
            },
            create: function () {
                function a() {
                    d.gEl(c.id).contentWindow.W17.subscribe("chart_load_requested", function (a) {
                        c.load(JSON.parse(a.content), a)
                    })
                }
                var b = this.render(),
                    c = this,
                    h;
                if (this.options.container) {
                    var f =
                        d.gEl(this.options.container);
                    f.innerHTML = b
                } else document.write(b);
                this.options.fullscreen && (f = $(d.gEl(this.id)), f.css("width", "100%"));
                this._autoResizeChart();
                window.addEventListener("resize", function (a) {
                    c._autoResizeChart()
                });
                h = d.gEl(this.id);
                this.postMessage = d.postMessageWrapper(h.contentWindow, this.id);
                d.bindEvent(h, "load", function () {
                    c.postMessage.get("widgetReady", {
                        client_id: this.id
                    }, function () {
                        var b;
                        c._ready = !0;
                        for (b = c._ready_handlers.length; b--;) c._ready_handlers[b].call(c);
                        c.postMessage.post(h.contentWindow,
                            "initializationFinished");
                        b = d.gEl(c.id).contentWindow;
                        b.W17 ? a() : d.bindEvent(b, "load", a)
                    })
                })
            },
            render: function () {
                window[this.options.uid] = {
                    datafeed: this.options.datafeed,
                    overrides: this.options.overrides,
                    studiesOverrides: this.options.studiesOverrides,
                    disabledFeatures: this.options.disabledFeatures,
                    enabledFeatures: this.options.enabledFeatures,
                    enabledDrawings: this.options.enabledDrawings,
                    disabledDrawings: this.options.disabledDrawings,
                    favorites: this.options.favorites,
                    logo: this.options.logo
                };
                this.options.savedData && (window[this.options.uid].chartContent = {
                    json: this.options.savedData
                });
                var a = (this.options.path || "") + "static/tv-chart-deobfuscated.html#localserver=1&symbol=" + encodeURIComponent(this.options.symbol) + "&interval=" + encodeURIComponent(this.options.interval) + (this.options.toolbar_bg ? "&toolbarbg=" + this.options.toolbar_bg.replace("#", "") : "") + "&hideSymbolSearch=" + this.options.hideSymbolSearch + "&hideSideToolbar=" + this.options.hideSideToolbar + "&enabledStudies=" + encodeURIComponent(JSON.stringify(this.options.enabledStudies)) +
                    "&disabledStudies=" + encodeURIComponent(JSON.stringify(this.options.disabledStudies)) + (this.options.studiesAccess ? "&studiesAccess=" + encodeURIComponent(JSON.stringify(this.options.studiesAccess)) : "") + "&widgetbar=" + encodeURIComponent(JSON.stringify(this.options.widgetbar)) + (this.options.drawingsAccess ? "&drawingsAccess=" + encodeURIComponent(JSON.stringify(this.options.drawingsAccess)) : "") + "&timeFrames=" + encodeURIComponent(JSON.stringify(this.options.time_frames)) + (this.options.hasOwnProperty("disableLogo") ?
                        "&disableLogo=" + encodeURIComponent(this.options.disableLogo) : "") + "&locale=" + encodeURIComponent(this.options.locale) + "&uid=" + encodeURIComponent(this.options.uid) + "&clientId=" + encodeURIComponent(this.options.client_id) + "&userId=" + encodeURIComponent(this.options.user_id) + (this.options.charts_storage_url ? "&chartsStorageUrl=" + encodeURIComponent(this.options.charts_storage_url) : "") + (this.options.indicators_file_name ? "&indicatorsFile=" + encodeURIComponent(this.options.indicators_file_name) : "") + "&debug=" +
                    this.options.debug + (this.options.snapshotUrl ? "&snapshotUrl=" + encodeURIComponent(this.options.snapshotUrl) : "") + (this.options.timezone ? "&timezone=" + encodeURIComponent(this.options.timezone) : "");
                return '<iframe id="' + this.id + '" name="' + this.id + '"  src="' + a + '"' + (this.options.fullscreen ? "" : ' width="' + this.options.width + '" height="' + this.options.height + '"') + ' frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen style="display:block;"></iframe>'
            },
            onChartReady: function (a) {
                this._ready ? a.call(this) :
                    this._ready_handlers.push(a)
            },
            setSymbol: function (a, b, c) {
                this.postMessage.post(this._messageTarget(), "changeSymbol", {
                    symbol: a,
                    interval: b + ""
                });
                this.postMessage.on("symbolChangeFinished", c)
            },
            executeAction: function (a) {
                this.postMessage.post(this._messageTarget(), "executeAction", {
                    action: a
                })
            },
            removeAllStudies: function () {
                this.postMessage.post(this._messageTarget(), "removeAllStudies")
            },
            removeAllShapes: function () {
                this.postMessage.post(this._messageTarget(), "removeAllShapes")
            },
            createStudy: function (a, b, c, h, f,
                g) {
                d.gEl(this.id).contentWindow.createStudy({
                    name: a,
                    lock: c,
                    forceOverlay: b,
                    inputs: h,
                    callback: f,
                    overrides: g
                })
            },
            removeEntity: function (a) {
                this.postMessage.post(this._messageTarget(), "removeEntity", a)
            },
            createShape: function (a, b, c) {
                d.gEl(this.id).contentWindow.createShape({
                    point: a,
                    options: b,
                    callback: c
                })
            },
            createVerticalLine: function (a, b) {
                this.createShape(a, $.extend(b, {
                    shape: "vertical_line"
                }))
            },
            _lastBarPoint: function () {
                var a = d.gEl(this.id).contentWindow.W3,
                    b = a.model().timeScale().m_points.lastTimePointIndex(),
                    a = a.model().mainSeries().data().valueAt(b)[4];
                return {
                    index: b,
                    price: a
                }
            },
            createOrderLine: function () {
                var a = d.gEl(this.id).contentWindow.W3,
                    b = a._paneWidgets[0]._state;
                return a.model().createLineTool(b, this._lastBarPoint(), "LineToolOrder")._adapter
            },
            createPositionLine: function () {
                var a = d.gEl(this.id).contentWindow.W3,
                    b = a._paneWidgets[0]._state;
                return a.model().createLineTool(b, this._lastBarPoint(), "LineToolPosition")._adapter
            },
            createExecutionShape: function () {
                var a = d.gEl(this.id).contentWindow.W3,
                    b = a._paneWidgets[0]._state;
                return a.model().createLineTool(b, this._lastBarPoint(), "LineToolExecution")._adapter
            },
            _widgetResizeTimer: null,
            createButton: function (a) {
                a = a || {};
                var b = a.align || "left";
                a = d.gEl(this.id).contentWindow.headerWidget;
                b = "left" == b ? a._$left : a._$right;
                a = a.createGroup({
                    single: !0
                }).appendTo(b);
                a = $('<div class="button"></div>').appendTo(a);
                this._widgetResizeTimer && clearTimeout(this._widgetResizeTimer);
                var c = this.postMessage,
                    h = this._messageTarget();
                this._widgetResizeTimer = setTimeout(function () {
                    c.post(h,
                        "resize", {});
                    clearTimeout(this._widgetResizeTimer)
                }, 5);
                return a
            },
            symbolInterval: function (a) {
                this.postMessage.on("symbolInterval", function (b) {
                    a(JSON.parse(b))
                });
                this.postMessage.post(this._messageTarget(), "symbolIntervalRequest", {})
            },
            onSymbolChange: function (a) {
                this.postMessage.on("onSymbolChange", a)
            },
            onIntervalChange: function (a) {
                this.postMessage.on("onIntervalChange", a)
            },
            onTick: function (a) {
                this.postMessage.on("onTick", a)
            },
            remove: function () {
                var a = d.gEl(this.id);
                a.parentNode.removeChild(a)
            },
            getVisibleRange: function (a) {
                d.gEl(this.id).contentWindow.getVisibleRange(a)
            },
            setVisibleRange: function (a, b) {
                d.gEl(this.id).contentWindow.setVisibleRange(a, b)
            },
            onAutoSaveNeeded: function (a) {
                this.postMessage.on("onAutoSaveNeeded", a)
            },
            onMarkClick: function (a) {
                this.postMessage.on("onMarkClick", a)
            },
            onScreenshotReady: function (a) {
                this.postMessage.on("onScreenshotReady", a)
            },
            onContextMenu: function (a) {
                d.gEl(this.id).contentWindow.W17.subscribe("onContextMenu", function (b) {
                    b.callback(a(b.unixtime, b.price))
                })
            },
            onGrayedObjectClicked: function (a) {
                d.gEl(this.id).contentWindow.W17.subscribe("onGrayedObjectClicked",
                    a)
            },
            refreshMarks: function () {
                this.postMessage.post(this._messageTarget(), "refreshMarks")
            },
            clearMarks: function () {
                this.postMessage.post(this._messageTarget(), "clearMarks")
            },
            setChartType: function (a) {
                d.gEl(this.id).contentWindow.setChartType(a)
            },
            createStudyTemplate: function (a, b) {
                d.gEl(this.id).contentWindow.createStudyTemplate(a, b)
            },
            applyStudyTemplate: function (a) {
                d.gEl(this.id).contentWindow.applyStudyTemplate(a)
            },
            save: function (a) {
                this.postMessage.on("onChartSaved", a);
                this.postMessage.post(this._messageTarget(),
                    "saveChart", {})
            },
            load: function (a, b) {
                d.gEl(this.id).contentWindow.loadChart({
                    json: a,
                    extendedData: b
                })
            },
            setLanguage: function (a) {
                this.remove();
                this.options.locale = a;
                this.create()
            }
        };
        d.postMessageWrapper = function () {
            var a = {},
                b = {},
                c = {},
                d, f = 0,
                g = 0;
            window.addEventListener && window.addEventListener("message", function (c) {
                var e;
                try {
                    e = JSON.parse(c.data)
                } catch (f) {
                    return
                }
                e.provider && "TradingView" == e.provider && ("get" == e.type ? (c = b[e.client_id]) && c[e.name].call(e, e.data, function (a) {
                    d.postMessage(JSON.stringify({
                        id: e.id,
                        type: "on",
                        name: e.name,
                        client_id: e.client_id,
                        data: a,
                        provider: "TradingView"
                    }), "*")
                }) : "on" == e.type ? (c = a[e.client_id]) && c[e.id] && (c[e.id].call(e, e.data), delete c[e.id]) : "post" == e.type && (c = b[e.client_id]) && "function" === typeof c[e.name] && c[e.name].call(e, e.data, function () { }))
            });
            return function (k, e) {
                a[e] = {};
                b[e] = {};
                d = c[e] = k;
                return {
                    on: function (a, c) {
                        b[e][a] = c
                    },
                    get: function (b, d, g) {
                        b = {
                            id: f++,
                            type: "get",
                            name: b,
                            client_id: e,
                            data: d,
                            provider: "TradingView"
                        };
                        a[e][b.id] = g;
                        c[e].postMessage(JSON.stringify(b), "*")
                    },
                    post: function (a,
                        b, c) {
                        b = {
                            id: g++,
                            type: "post",
                            name: b,
                            client_id: e,
                            data: c,
                            provider: "TradingView"
                        };
                        a && "function" === typeof a.postMessage && a.postMessage(JSON.stringify(b), "*")
                    }
                }
            }
        }();
        window.TradingView && jQuery ? jQuery.extend(window.TradingView, d) : window.TradingView = d
    }
})();