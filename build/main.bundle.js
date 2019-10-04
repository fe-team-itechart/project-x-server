/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b8b8bb186b677da19b06";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".mobileMenuActive {\n  display: flow-root !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/menu.scss":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/menu.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".menuIsOpen {\n  margin-left: 0% !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "#root {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  font-family: Roboto, sans-serif; }\n\nh1, h2, h3, h4, h5, h6 {\n  color: #fff; }\n\n.hidden_text {\n  display: none; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/common/helpPage.scss":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/common/helpPage.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".helpPage {\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  background-color: #262626;\n  line-height: 1.5; }\n  .helpPage p {\n    color: #fff;\n    padding: 10px 20px;\n    font-size: 16px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__footer_2j8xa {\n  margin: 15px 0;\n  width: 90%;\n  background-color: #262626;\n  display: flex;\n  justify-content: space-around;\n  padding: 20px 0; }\n  @media screen and (max-width: 1200px) {\n    .styles-module__footer_2j8xa {\n      flex-direction: column-reverse; } }\n  .styles-module__footer_2j8xa h2 {\n    color: #fff;\n    margin-bottom: 20px; }\n  .styles-module__footer_2j8xa p {\n    color: #fff; }\n  .styles-module__footer_2j8xa div {\n    width: 30%; }\n    @media screen and (max-width: 1200px) {\n      .styles-module__footer_2j8xa div {\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        padding-bottom: 20px;\n        align-items: center; } }\n    .styles-module__footer_2j8xa div img {\n      height: 40px; }\n      @media screen and (max-width: 1200px) {\n        .styles-module__footer_2j8xa div img {\n          width: 200px; } }\n\n.styles-module__socialMediaContainer_2UVJ7 {\n  height: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start; }\n  .styles-module__socialMediaContainer_2UVJ7 ul {\n    display: flex;\n    justify-content: space-around;\n    width: 80%;\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    @media screen and (max-width: 1200px) {\n      .styles-module__socialMediaContainer_2UVJ7 ul {\n        flex-direction: row;\n        width: 40%; } }\n    .styles-module__socialMediaContainer_2UVJ7 ul a {\n      width: 50px;\n      color: #000;\n      text-decoration: none; }\n      .styles-module__socialMediaContainer_2UVJ7 ul a:hover {\n        color: #000;\n        text-decoration: none; }\n      .styles-module__socialMediaContainer_2UVJ7 ul a:active, .styles-module__socialMediaContainer_2UVJ7 ul a:focus, .styles-module__socialMediaContainer_2UVJ7 ul a:visited {\n        color: #000;\n        text-decoration: underline; }\n      .styles-module__socialMediaContainer_2UVJ7 ul a .styles-module__socialMedia_2yh7Q {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 50px;\n        width: 50px;\n        background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n        border-radius: 50%; }\n        @media screen and (max-width: 576px) {\n          .styles-module__socialMediaContainer_2UVJ7 ul a .styles-module__socialMedia_2yh7Q {\n            margin: 0 2px; } }\n", ""]);
// Exports
exports.locals = {
	"footer": "styles-module__footer_2j8xa",
	"socialMediaContainer": "styles-module__socialMediaContainer_2UVJ7",
	"socialMedia": "styles-module__socialMedia_2yh7Q"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/help/styles.module.scss":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/help/styles.module.scss ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__cardsWrapper_1zmib {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  width: 90%;\n  margin: auto;\n  background-color: #262626; }\n  @media screen and (max-width: 768px) {\n    .styles-module__cardsWrapper_1zmib {\n      width: 90%; } }\n  .styles-module__cardsWrapper_1zmib h2 {\n    display: none; }\n  .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j {\n    display: block;\n    width: 340px;\n    text-decoration: none;\n    color: #fff;\n    text-align: center;\n    margin: 10px 0; }\n    @media screen and (max-width: 1511px) {\n      .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j {\n        width: 40%; } }\n    @media screen and (max-width: 768px) {\n      .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j {\n        width: 90%; } }\n    .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j .styles-module__cardWrapper_3cYdX {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      background-color: #212121;\n      padding: 20px;\n      height: 200px; }\n      .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j .styles-module__cardWrapper_3cYdX svg {\n        font-size: 56px;\n        margin: 10px 0; }\n      .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j .styles-module__cardWrapper_3cYdX h3 {\n        margin: 10px 0; }\n      .styles-module__cardsWrapper_1zmib .styles-module__cardLink_2Ol9j .styles-module__cardWrapper_3cYdX p {\n        font-size: 14px; }\n", ""]);
// Exports
exports.locals = {
	"cardsWrapper": "styles-module__cardsWrapper_1zmib",
	"cardLink": "styles-module__cardLink_2Ol9j",
	"cardWrapper": "styles-module__cardWrapper_3cYdX"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/modal/styles.module.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/modal/styles.module.scss ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__modal_fB3Xv {\n  font-family: Roboto, sans-serif;\n  background-color: #212121;\n  width: 380px;\n  border-radius: 6px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  right: auto;\n  bottom: auto;\n  margin-right: -50%;\n  transform: translate(-50%, -50%); }\n  .styles-module__modal_fB3Xv:focus {\n    outline: 0; }\n  .styles-module__modal_fB3Xv .styles-module__closeModal_2Aqtk {\n    color: #fff;\n    position: absolute;\n    right: 15px;\n    top: 15px;\n    padding: 0;\n    background: none;\n    border: none;\n    font: inherit;\n    cursor: pointer;\n    outline: none; }\n  @media screen and (max-width: 576px) {\n    .styles-module__modal_fB3Xv {\n      width: 90%; } }\n", ""]);
// Exports
exports.locals = {
	"modal": "styles-module__modal_fB3Xv",
	"closeModal": "styles-module__closeModal_2Aqtk"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/spinner/styles.module.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/spinner/styles.module.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__spinnerWrapper_1bYTT {\n  position: fixed;\n  z-index: 5;\n  width: 100%;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #000000a1; }\n  .styles-module__spinnerWrapper_1bYTT .styles-module__spinner_3mTPc {\n    display: block;\n    width: 70%;\n    max-width: 400px;\n    border-radius: 50%;\n    border-top: 10px solid #ff8c05;\n    animation: styles-module__spin_R-TXw 1.5s linear infinite; }\n  .styles-module__spinnerWrapper_1bYTT .styles-module__spinner_3mTPc:after {\n    content: '';\n    display: block;\n    padding-top: 100%; }\n\n@keyframes styles-module__spin_R-TXw {\n  to {\n    transform: rotate(360deg); } }\n", ""]);
// Exports
exports.locals = {
	"spinnerWrapper": "styles-module__spinnerWrapper_1bYTT",
	"spinner": "styles-module__spinner_3mTPc",
	"spin": "styles-module__spin_R-TXw"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/styles.module.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/styles.module.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__page_a8NdZ {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #212121; }\n", ""]);
// Exports
exports.locals = {
	"page": "styles-module__page_a8NdZ"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/forgotPassword/styles.module.scss":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/forgotPassword/styles.module.scss ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__form_xegLd {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  box-sizing: border-box;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  height: 210px; }\n\n.styles-module__successMessage_3xt_V {\n  font-size: 2em;\n  color: #2ecc71; }\n\n.styles-module__errorMessage_3B3AU {\n  font-size: inherit;\n  color: #d61a5e;\n  height: 30px; }\n\n.styles-module__input_3xmCG {\n  border: 0;\n  border-bottom: 1px solid #515151;\n  border-radius: 0;\n  outline: none;\n  padding: 6px 0;\n  color: #fff;\n  background: transparent;\n  font-weight: 400;\n  font-size: 18px;\n  transition: border-bottom .3s;\n  line-height: 1.5;\n  width: 100%;\n  margin-bottom: 10px; }\n  .styles-module__input_3xmCG:hover, .styles-module__input_3xmCG:focus {\n    border-bottom: 1px solid #ff8c05; }\n  .styles-module__input_3xmCG:-webkit-autofill, .styles-module__input_3xmCG:-webkit-autofill:hover, .styles-module__input_3xmCG:-webkit-autofill:focus, .styles-module__input_3xmCG:-webkit-autofill:active {\n    transition: background-color 5000s ease-in-out 0s;\n    -webkit-text-fill-color: #fff; }\n  .styles-module__input_3xmCG:invalid {\n    border-color: red; }\n  .styles-module__input_3xmCG:valid {\n    border-color: green; }\n\n.styles-module__btn_1Schs {\n  cursor: pointer;\n  border: 0;\n  border-radius: 2px;\n  padding: 13px 20px;\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n  font-size: 16px;\n  color: #fff;\n  outline: none;\n  font-weight: 600;\n  line-height: 1.5;\n  transition: all 2s;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 20%;\n  margin: 15px; }\n  .styles-module__btn_1Schs:hover {\n    background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"form": "styles-module__form_xegLd",
	"successMessage": "styles-module__successMessage_3xt_V",
	"errorMessage": "styles-module__errorMessage_3B3AU",
	"input": "styles-module__input_3xmCG",
	"btn": "styles-module__btn_1Schs"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/resetPassword/styles.module.scss":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/resetPassword/styles.module.scss ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__wrapperForm_1YNdx {\n  font-family: Roboto, sans-serif;\n  color: #fff;\n  width: 90%;\n  display: flex;\n  height: calc(100vh - 120px - 198px);\n  justify-content: center; }\n  @media (max-width: 1200px) {\n    .styles-module__wrapperForm_1YNdx {\n      height: calc(100vh - 120px - 367px); } }\n  .styles-module__wrapperForm_1YNdx .styles-module__form_1Axm9 {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    max-width: 640px;\n    padding: 15px;\n    align-items: center;\n    box-sizing: border-box; }\n  .styles-module__wrapperForm_1YNdx .styles-module__row_2sg6k {\n    margin: 15px 0 0 0; }\n  .styles-module__wrapperForm_1YNdx .styles-module__successMessage_3TJ6x {\n    font-size: 2em;\n    color: #2ecc71; }\n  .styles-module__wrapperForm_1YNdx .styles-module__errorMessage_33MkG {\n    font-size: inherit;\n    color: #d61a5e; }\n  .styles-module__wrapperForm_1YNdx .styles-module__btn__40Hv {\n    cursor: pointer;\n    border: 0;\n    border-radius: 2px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 16px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 20%;\n    align-self: flex-end;\n    margin-top: 25px; }\n    .styles-module__wrapperForm_1YNdx .styles-module__btn__40Hv:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 18px;\n    transition: border-bottom .3s;\n    line-height: 1.5;\n    width: 100%; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:hover, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill:hover, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill:focus, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:invalid {\n      border-color: red; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:valid {\n      border-color: green; }\n", ""]);
// Exports
exports.locals = {
	"wrapperForm": "styles-module__wrapperForm_1YNdx",
	"form": "styles-module__form_1Axm9",
	"row": "styles-module__row_2sg6k",
	"successMessage": "styles-module__successMessage_3TJ6x",
	"errorMessage": "styles-module__errorMessage_33MkG",
	"btn": "styles-module__btn__40Hv",
	"input": "styles-module__input_vqf9t"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/styles.module.scss":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/styles.module.scss ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__title_2jy1_ {\n  color: #ff8c05;\n  font-size: 28px;\n  text-align: center; }\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  form input {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 18px;\n    transition: border-bottom .3s;\n    line-height: 1.5;\n    width: 75%;\n    margin: 15px 15px 0; }\n    form input:hover, form input:focus {\n      border-bottom: 1px solid #ff8c05; }\n    form input:-webkit-autofill, form input:-webkit-autofill:hover, form input:-webkit-autofill:focus, form input:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n  form .styles-module__invalidFeedback_3P6k1 {\n    color: #d61a5e;\n    width: 75%;\n    padding: 5px 0; }\n  form .styles-module__submit_fFa0v {\n    cursor: pointer;\n    border: 0;\n    border-radius: 2px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 16px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 210px;\n    margin: 10px 0 15px 0; }\n    form .styles-module__submit_fFa0v:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  form .styles-module__socialButtonsContainer_2VX6B {\n    display: flex;\n    justify-content: space-around;\n    width: 105px;\n    margin-top: 10px; }\n    form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo,\n    form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y {\n      width: 40px;\n      height: 40px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-width: 0;\n      background: #fff;\n      color: #737373;\n      border-radius: 5px;\n      white-space: nowrap;\n      box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);\n      transition-property: background-color, box-shadow;\n      transition-duration: 150ms;\n      transition-timing-function: ease-in-out;\n      padding: 0; }\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo:focus, form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo:hover,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y:focus,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y:hover {\n        box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1); }\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo:active,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y:active {\n        background-color: #fff;\n        box-shadow: none;\n        transition-duration: 10ms; }\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo .styles-module__googleButtonIcon_3SZ2N,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo .styles-module__linkedinButtonIcon_3SH1P,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y .styles-module__googleButtonIcon_3SZ2N,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y .styles-module__linkedinButtonIcon_3SH1P {\n        display: inline-block;\n        vertical-align: middle;\n        width: 18px;\n        height: 18px;\n        box-sizing: border-box; }\n  form .styles-module__linkForgot_3TmXG {\n    font-size: 0.7em;\n    color: #fff;\n    opacity: 0.6;\n    cursor: pointer;\n    margin-bottom: 25px;\n    transition: all 0.1s; }\n    form .styles-module__linkForgot_3TmXG:hover {\n      color: #ff8c05;\n      opacity: 1; }\n", ""]);
// Exports
exports.locals = {
	"title": "styles-module__title_2jy1_",
	"invalidFeedback": "styles-module__invalidFeedback_3P6k1",
	"submit": "styles-module__submit_fFa0v",
	"socialButtonsContainer": "styles-module__socialButtonsContainer_2VX6B",
	"googleButton": "styles-module__googleButton_SNMGo",
	"linkedinButton": "styles-module__linkedinButton_2Kj3Y",
	"googleButtonIcon": "styles-module__googleButtonIcon_3SZ2N",
	"linkedinButtonIcon": "styles-module__linkedinButtonIcon_3SH1P",
	"linkForgot": "styles-module__linkForgot_3TmXG"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/categories/styles.module.scss":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/categories/styles.module.scss ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__mainPageWrapper_3vH7A {\n  display: flex;\n  width: 90%;\n  height: 100vh;\n  background-color: #262626; }\n", ""]);
// Exports
exports.locals = {
	"mainPageWrapper": "styles-module__mainPageWrapper_3vH7A"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/couresCarousel/styles.module.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/couresCarousel/styles.module.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__carouselContainer_1Qs4G {\n  height: 375px;\n  background-color: #262626;\n  margin: 15px 0;\n  width: 90%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between; }\n  .styles-module__carouselContainer_1Qs4G .styles-module__carouselArrows_11xj0 {\n    max-width: 50px;\n    max-height: 50px;\n    width: 100%;\n    height: 100%; }\n  .styles-module__carouselContainer_1Qs4G .styles-module__navButton_3hwID {\n    width: 5%;\n    background: Transparent no-repeat;\n    border: none;\n    cursor: pointer;\n    overflow: hidden;\n    outline: none;\n    height: 100%; }\n    @media screen and (max-width: 768px) {\n      .styles-module__carouselContainer_1Qs4G .styles-module__navButton_3hwID {\n        display: none; } }\n  .styles-module__carouselContainer_1Qs4G .styles-module__carousel_3j2Pm {\n    width: 85%; }\n    @media screen and (max-width: 768px) {\n      .styles-module__carouselContainer_1Qs4G .styles-module__carousel_3j2Pm {\n        width: 100%; } }\n  .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH {\n    height: 285px;\n    width: 270px;\n    background-color: #212121;\n    position: relative;\n    left: 50%;\n    margin-left: -135px; }\n    @media screen and (max-width: 350px) {\n      .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH {\n        left: 50%;\n        margin-left: -135px; } }\n    .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH .styles-module__addingButton_W1V22 {\n      position: absolute;\n      border-radius: 50%;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      font-size: 24px;\n      padding: 0;\n      width: 40px;\n      height: 40px;\n      top: 10px;\n      right: 10px; }\n    .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH .styles-module__image_3SSpn {\n      margin: 0;\n      width: 100%;\n      height: 130px;\n      background: url(\"https://www.scnsoft.com/blog-pictures/cover-pics/react_js.png\") center/cover;\n      border-radius: 5px; }\n    .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH .styles-module__name_2gUoZ {\n      color: #fff;\n      margin: 10px auto;\n      width: 220px; }\n    .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH .styles-module__duration_2spuO {\n      color: #737373;\n      margin: 10px auto;\n      width: 220px; }\n    .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH button {\n      cursor: pointer;\n      border: 0;\n      border-radius: 2px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 16px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      margin: auto;\n      width: 220px;\n      height: 70px; }\n      .styles-module__carouselContainer_1Qs4G .styles-module__courseCardContainer_2GXNH button:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"carouselContainer": "styles-module__carouselContainer_1Qs4G",
	"carouselArrows": "styles-module__carouselArrows_11xj0",
	"navButton": "styles-module__navButton_3hwID",
	"carousel": "styles-module__carousel_3j2Pm",
	"courseCardContainer": "styles-module__courseCardContainer_2GXNH",
	"addingButton": "styles-module__addingButton_W1V22",
	"image": "styles-module__image_3SSpn",
	"name": "styles-module__name_2gUoZ",
	"duration": "styles-module__duration_2spuO"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/header/styles.module.scss":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/header/styles.module.scss ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__header_3pg0x {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #262626;\n  padding: 20px 0;\n  color: #fff;\n  height: 50px;\n  font-size: 16px;\n  width: 90%;\n  margin: 15px 0; }\n  @media (max-width: 992px) {\n    .styles-module__header_3pg0x {\n      justify-content: space-around; } }\n  @media (max-width: 576px) {\n    .styles-module__header_3pg0x {\n      display: block;\n      height: auto;\n      padding-bottom: 0; } }\n  @media (max-width: 576px) {\n    .styles-module__header_3pg0x div {\n      padding: 0 15px;\n      text-align: center;\n      margin: 10px 0; } }\n  .styles-module__header_3pg0x .styles-module__menuIcons_bqZdN {\n    cursor: pointer; }\n    @media (max-width: 576px) {\n      .styles-module__header_3pg0x .styles-module__menuIcons_bqZdN {\n        position: absolute;\n        z-index: 1;\n        right: 20px;\n        top: 20px; } }\n    .styles-module__header_3pg0x .styles-module__menuIcons_bqZdN svg {\n      font-size: 30px;\n      padding: 15px; }\n  .styles-module__header_3pg0x .styles-module__logo_2XYVR {\n    flex: 0.3 1 auto;\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n    @media (max-width: 768px) {\n      .styles-module__header_3pg0x .styles-module__logo_2XYVR {\n        justify-content: flex-start; } }\n    @media (max-width: 576px) {\n      .styles-module__header_3pg0x .styles-module__logo_2XYVR {\n        display: block;\n        text-align: left; } }\n    .styles-module__header_3pg0x .styles-module__logo_2XYVR img {\n      cursor: pointer;\n      height: 32px; }\n  .styles-module__header_3pg0x .styles-module__search_3UrTF {\n    display: flex;\n    align-items: center;\n    position: relative;\n    flex: 1 1 auto;\n    cursor: pointer; }\n    @media (max-width: 576px) {\n      .styles-module__header_3pg0x .styles-module__search_3UrTF {\n        padding: 0 25px; } }\n    .styles-module__header_3pg0x .styles-module__search_3UrTF input {\n      border: 0;\n      border-bottom: 1px solid #515151;\n      border-radius: 0;\n      outline: none;\n      padding: 6px 0;\n      color: #fff;\n      background: transparent;\n      font-weight: 400;\n      font-size: 18px;\n      transition: border-bottom .3s;\n      line-height: 1.5;\n      padding: 0;\n      width: 100%; }\n      .styles-module__header_3pg0x .styles-module__search_3UrTF input:hover, .styles-module__header_3pg0x .styles-module__search_3UrTF input:focus {\n        border-bottom: 1px solid #ff8c05; }\n      .styles-module__header_3pg0x .styles-module__search_3UrTF input:-webkit-autofill, .styles-module__header_3pg0x .styles-module__search_3UrTF input:-webkit-autofill:hover, .styles-module__header_3pg0x .styles-module__search_3UrTF input:-webkit-autofill:focus, .styles-module__header_3pg0x .styles-module__search_3UrTF input:-webkit-autofill:active {\n        transition: background-color 5000s ease-in-out 0s;\n        -webkit-text-fill-color: #fff; }\n      .styles-module__header_3pg0x .styles-module__search_3UrTF input::placeholder {\n        color: #515151; }\n      @media (max-width: 576px) {\n        .styles-module__header_3pg0x .styles-module__search_3UrTF input {\n          padding: 8px 0; } }\n    @media (max-width: 576px) {\n      .styles-module__header_3pg0x .styles-module__search_3UrTF svg {\n        right: 25px; } }\n    .styles-module__header_3pg0x .styles-module__search_3UrTF .styles-module__icon_mDVhv {\n      position: absolute;\n      font-size: 25px;\n      right: 0;\n      cursor: pointer;\n      transition: 0.3s; }\n    .styles-module__header_3pg0x .styles-module__search_3UrTF .styles-module__icon_mDVhv:hover {\n      color: #ff8c05; }\n  .styles-module__header_3pg0x .styles-module__menu_RePKY {\n    flex: 2 1 auto;\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    list-style-type: none; }\n    @media (max-width: 767px) {\n      .styles-module__header_3pg0x .styles-module__menu_RePKY {\n        position: fixed;\n        top: 110px;\n        z-index: 2;\n        right: 0;\n        display: none;\n        width: 90%;\n        padding: 10px 0%;\n        margin: 0 5%;\n        border-radius: 8px;\n        background-color: #262626; } }\n    @media (max-width: 576px) {\n      .styles-module__header_3pg0x .styles-module__menu_RePKY {\n        top: 150px; } }\n    @media (max-width: 767px) {\n      .styles-module__header_3pg0x .styles-module__menu_RePKY div {\n        margin: 15px 0;\n        text-align: center; } }\n    .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__link_2yumC {\n      cursor: pointer;\n      font-weight: bold;\n      transition: 0.3s;\n      text-decoration: none;\n      color: #fff;\n      margin: 0 5px; }\n    .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__link_2yumC:hover {\n      color: #ff8c05;\n      text-decoration: underline; }\n    .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__button__aYRT {\n      cursor: pointer;\n      border: 0;\n      border-radius: 2px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 16px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 10px 20px;\n      transition: none; }\n      .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__button__aYRT:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n      @media (max-width: 767px) {\n        .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__button__aYRT {\n          width: 100%;\n          max-width: 200px;\n          margin: 5px 0 0 -100px;\n          position: relative;\n          left: 50%;\n          transition: none; } }\n  @media (min-width: 768px) {\n    .styles-module__header_3pg0x .styles-module__buttonsBlock_2pAqh {\n      width: 200px;\n      display: flex;\n      justify-content: space-evenly; } }\n  @media (min-width: 992px) {\n    .styles-module__header_3pg0x .styles-module__buttonsBlock_2pAqh {\n      width: 300px; } }\n  .styles-module__header_3pg0x .styles-module__outSideMenuClick_2AKVS {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    background-color: rgba(255, 255, 255, 0.75);\n    top: 0;\n    left: 0;\n    margin: 0;\n    padding: 0; }\n", ""]);
// Exports
exports.locals = {
	"header": "styles-module__header_3pg0x",
	"menuIcons": "styles-module__menuIcons_bqZdN",
	"logo": "styles-module__logo_2XYVR",
	"search": "styles-module__search_3UrTF",
	"icon": "styles-module__icon_mDVhv",
	"menu": "styles-module__menu_RePKY",
	"link": "styles-module__link_2yumC",
	"button": "styles-module__button__aYRT",
	"buttonsBlock": "styles-module__buttonsBlock_2pAqh",
	"outSideMenuClick": "styles-module__outSideMenuClick_2AKVS"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__footer_9rYdq footer {\n  display: flex;\n  justify-content: space-around;\n  flex-direction: column-reverse;\n  width: 100%;\n  margin-bottom: 0px;\n  background-color: #262626; }\n  .styles-module__footer_9rYdq footer div {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 100%;\n    padding-bottom: 20px; }\n    .styles-module__footer_9rYdq footer div h2 {\n      font-size: 14px; }\n    .styles-module__footer_9rYdq footer div p {\n      font-size: 12px; }\n    .styles-module__footer_9rYdq footer div img {\n      max-width: 100px;\n      height: auto; }\n  .styles-module__footer_9rYdq footer ul li span {\n    margin: 0 2px;\n    height: 25px;\n    width: 25px; }\n", ""]);
// Exports
exports.locals = {
	"footer": "styles-module__footer_9rYdq"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss ***!
  \*******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__burger_Z524t {\n  width: 15px;\n  height: 15px;\n  cursor: pointer;\n  background: linear-gradient(to bottom, white 15%, transparent 16%, transparent 43.5%, white 44.5%, white 58.5%, transparent 59.5%, transparent 86%, white 87%); }\n\n.styles-module__burgerActive_1TGK1 {\n  width: 15px;\n  height: 15px;\n  background: linear-gradient(45deg, transparent 45%, #fff 46%, #fff 55%, transparent 56%), linear-gradient(-45deg, transparent 45%, #fff 46%, #fff 55%, transparent 56%);\n  list-style-type: none; }\n\n.styles-module__clickOutside_191Pg {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100vh; }\n\n.styles-module__menu_37Rzl {\n  display: block;\n  position: absolute;\n  width: 150px;\n  text-align: center;\n  right: 15px;\n  top: 105px;\n  overflow: hidden;\n  z-index: 7;\n  box-sizing: border-box; }\n  .styles-module__menu_37Rzl .styles-module__menuItem_3d_BU {\n    box-sizing: border-box;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 30px;\n    width: 100%;\n    color: #fff;\n    font-size: 12px;\n    text-decoration: none;\n    border-bottom: 1px solid #212121;\n    background-color: #515151; }\n  .styles-module__menu_37Rzl .styles-module__search_1UoXV {\n    display: flex;\n    align-items: center;\n    position: relative;\n    flex: 1 1 auto;\n    cursor: pointer;\n    background-color: #515151;\n    height: 30px;\n    padding: 0 15px; }\n    .styles-module__menu_37Rzl .styles-module__search_1UoXV input {\n      border: 0;\n      border-bottom: 1px solid #515151;\n      border-radius: 0;\n      outline: none;\n      padding: 6px 0;\n      color: #fff;\n      background: transparent;\n      font-weight: 400;\n      font-size: 18px;\n      transition: border-bottom .3s;\n      line-height: 1.5;\n      width: 100%;\n      padding: 0 5%; }\n      .styles-module__menu_37Rzl .styles-module__search_1UoXV input:hover, .styles-module__menu_37Rzl .styles-module__search_1UoXV input:focus {\n        border-bottom: 1px solid #ff8c05; }\n      .styles-module__menu_37Rzl .styles-module__search_1UoXV input:-webkit-autofill, .styles-module__menu_37Rzl .styles-module__search_1UoXV input:-webkit-autofill:hover, .styles-module__menu_37Rzl .styles-module__search_1UoXV input:-webkit-autofill:focus, .styles-module__menu_37Rzl .styles-module__search_1UoXV input:-webkit-autofill:active {\n        transition: background-color 5000s ease-in-out 0s;\n        -webkit-text-fill-color: #fff; }\n    .styles-module__menu_37Rzl .styles-module__search_1UoXV .styles-module__icon_16-tZ {\n      position: absolute;\n      font-size: 25px;\n      right: 5%;\n      cursor: pointer;\n      transition: 0.3s; }\n    .styles-module__menu_37Rzl .styles-module__search_1UoXV .styles-module__icon_16-tZ:hover {\n      color: #ff8c05; }\n  .styles-module__menu_37Rzl .styles-module__button_2haFh {\n    cursor: pointer;\n    border: 0;\n    border-radius: 2px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 16px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 30px;\n    font-size: 12px;\n    padding: 0;\n    border-radius: 0px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.3); }\n    .styles-module__menu_37Rzl .styles-module__button_2haFh:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"burger": "styles-module__burger_Z524t",
	"burgerActive": "styles-module__burgerActive_1TGK1",
	"clickOutside": "styles-module__clickOutside_191Pg",
	"menu": "styles-module__menu_37Rzl",
	"menuItem": "styles-module__menuItem_3d_BU",
	"search": "styles-module__search_1UoXV",
	"icon": "styles-module__icon_16-tZ",
	"button": "styles-module__button_2haFh"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/styles.module.scss":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/styles.module.scss ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__header_3ypdr {\n  margin-top: 15px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #262626;\n  color: #fff; }\n  @media (max-width: 992px) {\n    .styles-module__header_3ypdr {\n      justify-content: space-around; } }\n  .styles-module__header_3ypdr .styles-module__burger_1BRWs {\n    width: 15px;\n    height: 15px;\n    cursor: pointer;\n    background: linear-gradient(to bottom, white 15%, transparent 16%, transparent 43.5%, white 44.5%, white 58.5%, transparent 59.5%, transparent 86%, white 87%); }\n  .styles-module__header_3ypdr .styles-module__logo_3HkK_ {\n    width: 80px;\n    flex: 0.3 1 auto;\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n    @media (max-width: 768px) {\n      .styles-module__header_3ypdr .styles-module__logo_3HkK_ {\n        justify-content: flex-start; } }\n    .styles-module__header_3ypdr .styles-module__logo_3HkK_ img {\n      cursor: pointer; }\n  .styles-module__header_3ypdr .styles-module__search_3r7TF {\n    display: flex;\n    align-items: center;\n    position: relative;\n    flex: 1 1 auto;\n    cursor: pointer; }\n    .styles-module__header_3ypdr .styles-module__search_3r7TF input {\n      border: 0;\n      border-bottom: 1px solid #515151;\n      border-radius: 0;\n      outline: none;\n      padding: 6px 0;\n      color: #fff;\n      background: transparent;\n      font-weight: 400;\n      font-size: 18px;\n      transition: border-bottom .3s;\n      line-height: 1.5;\n      padding: 0;\n      width: 100%; }\n      .styles-module__header_3ypdr .styles-module__search_3r7TF input:hover, .styles-module__header_3ypdr .styles-module__search_3r7TF input:focus {\n        border-bottom: 1px solid #ff8c05; }\n      .styles-module__header_3ypdr .styles-module__search_3r7TF input:-webkit-autofill, .styles-module__header_3ypdr .styles-module__search_3r7TF input:-webkit-autofill:hover, .styles-module__header_3ypdr .styles-module__search_3r7TF input:-webkit-autofill:focus, .styles-module__header_3ypdr .styles-module__search_3r7TF input:-webkit-autofill:active {\n        transition: background-color 5000s ease-in-out 0s;\n        -webkit-text-fill-color: #fff; }\n      .styles-module__header_3ypdr .styles-module__search_3r7TF input::placeholder {\n        color: #515151; }\n    .styles-module__header_3ypdr .styles-module__search_3r7TF .styles-module__icon_gZeSr {\n      position: absolute;\n      font-size: 25px;\n      right: 0;\n      cursor: pointer;\n      transition: 0.3s; }\n    .styles-module__header_3ypdr .styles-module__search_3r7TF .styles-module__icon_gZeSr:hover {\n      color: #ff8c05; }\n  .styles-module__header_3ypdr .styles-module__menu_3BjFg {\n    flex: 2 1 auto;\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    list-style-type: none; }\n    .styles-module__header_3ypdr .styles-module__menu_3BjFg .styles-module__link_2qLEN {\n      cursor: pointer;\n      font-weight: bold;\n      transition: 0.3s;\n      text-decoration: none;\n      color: #fff; }\n    .styles-module__header_3ypdr .styles-module__menu_3BjFg .styles-module__link_2qLEN:hover {\n      color: #ff8c05;\n      text-decoration: underline; }\n    .styles-module__header_3ypdr .styles-module__menu_3BjFg .styles-module__button_2KwaB {\n      cursor: pointer;\n      border: 0;\n      border-radius: 2px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 16px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-basis: 20%;\n      padding: 10px 0px; }\n      .styles-module__header_3ypdr .styles-module__menu_3BjFg .styles-module__button_2KwaB:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n      @media (max-width: 992px) {\n        .styles-module__header_3ypdr .styles-module__menu_3BjFg .styles-module__button_2KwaB {\n          flex-basis: 23%; } }\n", ""]);
// Exports
exports.locals = {
	"header": "styles-module__header_3ypdr",
	"burger": "styles-module__burger_1BRWs",
	"logo": "styles-module__logo_3HkK_",
	"search": "styles-module__search_3r7TF",
	"icon": "styles-module__icon_gZeSr",
	"menu": "styles-module__menu_3BjFg",
	"link": "styles-module__link_2qLEN",
	"button": "styles-module__button_2KwaB"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__profile_3ymMV input {\n  border: 0;\n  border-bottom: 1px solid #515151;\n  border-radius: 0;\n  outline: none;\n  padding: 6px 0;\n  color: #fff;\n  background: transparent;\n  font-weight: 400;\n  font-size: 18px;\n  transition: border-bottom .3s;\n  line-height: 1.5;\n  background-color: transparent;\n  color: #fff; }\n  .styles-module__profile_3ymMV input:hover, .styles-module__profile_3ymMV input:focus {\n    border-bottom: 1px solid #ff8c05; }\n  .styles-module__profile_3ymMV input:-webkit-autofill, .styles-module__profile_3ymMV input:-webkit-autofill:hover, .styles-module__profile_3ymMV input:-webkit-autofill:focus, .styles-module__profile_3ymMV input:-webkit-autofill:active {\n    transition: background-color 5000s ease-in-out 0s;\n    -webkit-text-fill-color: #fff; }\n  .styles-module__profile_3ymMV input::placeholder {\n    color: #515151; }\n\n.styles-module__profile_3ymMV .styles-module__userFio_3hhGe {\n  display: flex; }\n  .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 18px;\n    transition: border-bottom .3s;\n    line-height: 1.5;\n    width: 50%;\n    padding: 15px 5px;\n    margin: 0 5px; }\n    .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input:hover, .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input:-webkit-autofill, .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input:-webkit-autofill:hover, .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input:-webkit-autofill:focus, .styles-module__profile_3ymMV .styles-module__userFio_3hhGe input:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n\n.styles-module__profile_3ymMV .styles-module__description_2iD7n {\n  margin: 5px; }\n  .styles-module__profile_3ymMV .styles-module__description_2iD7n input {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 18px;\n    transition: border-bottom .3s;\n    line-height: 1.5;\n    width: 100%;\n    padding: 15px 5px; }\n    .styles-module__profile_3ymMV .styles-module__description_2iD7n input:hover, .styles-module__profile_3ymMV .styles-module__description_2iD7n input:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__profile_3ymMV .styles-module__description_2iD7n input:-webkit-autofill, .styles-module__profile_3ymMV .styles-module__description_2iD7n input:-webkit-autofill:hover, .styles-module__profile_3ymMV .styles-module__description_2iD7n input:-webkit-autofill:focus, .styles-module__profile_3ymMV .styles-module__description_2iD7n input:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n\n.styles-module__profile_3ymMV .styles-module__social_2XSBq {\n  margin: 5px; }\n  .styles-module__profile_3ymMV .styles-module__social_2XSBq div {\n    margin: 15px 0;\n    display: flex; }\n    .styles-module__profile_3ymMV .styles-module__social_2XSBq div span {\n      padding: 0;\n      font-size: 12px; }\n    .styles-module__profile_3ymMV .styles-module__social_2XSBq div input {\n      border: 0;\n      border-bottom: 1px solid #515151;\n      border-radius: 0;\n      outline: none;\n      padding: 6px 0;\n      color: #fff;\n      background: transparent;\n      font-weight: 400;\n      font-size: 18px;\n      transition: border-bottom .3s;\n      line-height: 1.5;\n      padding: 15px 5px;\n      width: 100px; }\n      .styles-module__profile_3ymMV .styles-module__social_2XSBq div input:hover, .styles-module__profile_3ymMV .styles-module__social_2XSBq div input:focus {\n        border-bottom: 1px solid #ff8c05; }\n      .styles-module__profile_3ymMV .styles-module__social_2XSBq div input:-webkit-autofill, .styles-module__profile_3ymMV .styles-module__social_2XSBq div input:-webkit-autofill:hover, .styles-module__profile_3ymMV .styles-module__social_2XSBq div input:-webkit-autofill:focus, .styles-module__profile_3ymMV .styles-module__social_2XSBq div input:-webkit-autofill:active {\n        transition: background-color 5000s ease-in-out 0s;\n        -webkit-text-fill-color: #fff; }\n  .styles-module__profile_3ymMV .styles-module__social_2XSBq svg {\n    font-size: 20px;\n    margin: 0 5px; }\n  .styles-module__profile_3ymMV .styles-module__social_2XSBq .styles-module__facebookIcon_1_HwH {\n    color: #3b5998; }\n  .styles-module__profile_3ymMV .styles-module__social_2XSBq .styles-module__twitterIcon_2b2ZI {\n    color: #1da1f2; }\n  .styles-module__profile_3ymMV .styles-module__social_2XSBq .styles-module__linkedinIcon_2uFnx {\n    color: #0073b0; }\n\n.styles-module__profile_3ymMV button {\n  cursor: pointer;\n  border: 0;\n  border-radius: 2px;\n  padding: 13px 20px;\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n  font-size: 16px;\n  color: #fff;\n  outline: none;\n  font-weight: 600;\n  line-height: 1.5;\n  transition: all 2s;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 60px;\n  height: 35px;\n  float: left;\n  color: #fff;\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n  text-align: center;\n  font-size: 12px;\n  border: none;\n  padding: 0;\n  margin: 0 15px 0 0; }\n  .styles-module__profile_3ymMV button:hover {\n    background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"profile": "styles-module__profile_3ymMV",
	"userFio": "styles-module__userFio_3hhGe",
	"description": "styles-module__description_2iD7n",
	"social": "styles-module__social_2XSBq",
	"facebookIcon": "styles-module__facebookIcon_1_HwH",
	"twitterIcon": "styles-module__twitterIcon_2b2ZI",
	"linkedinIcon": "styles-module__linkedinIcon_2uFnx"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__hiddenText_2j9DH {\n  display: none; }\n\n.styles-module__closeButton_1VZS3 svg {\n  font-size: 12px;\n  color: #ff8c05; }\n\n.styles-module__closeButton_1VZS3:hover svg {\n  color: #262626; }\n\n.styles-module__photo_W8rUI {\n  width: 100px;\n  height: 100px;\n  margin: 0 15px 15px -50px;\n  position: relative;\n  left: 50%;\n  border-radius: 50%;\n  border: 2px #262626 solid;\n  background: center/auto 100% no-repeat url(https://www.ktk.kz/getimage/mainpagebig/111099) #212121; }\n\n.styles-module__mobileMenu_LrN6n ul {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.styles-module__mobileMenu_LrN6n button {\n  width: 100%;\n  height: 100px;\n  color: #fff;\n  background-color: #262626;\n  border: none;\n  border-top: 3px #212121 solid; }\n  .styles-module__mobileMenu_LrN6n button.styles-module__active_2tWBU {\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n  .styles-module__mobileMenu_LrN6n button:hover {\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    cursor: pointer; }\n\n.styles-module__mobileMenu_LrN6n .styles-module__user_14WZZ {\n  text-align: center;\n  margin-bottom: 15px; }\n  .styles-module__mobileMenu_LrN6n .styles-module__user_14WZZ .styles-module__name_3zYmq {\n    color: #fff;\n    font-size: 12px;\n    font-weight: 100; }\n  .styles-module__mobileMenu_LrN6n .styles-module__user_14WZZ .styles-module__role_1bSMh {\n    font-size: 12px;\n    color: #515151; }\n\n.styles-module__mobileBurger_1tpXJ {\n  display: block;\n  text-align: center;\n  padding: 15px 0; }\n  .styles-module__mobileBurger_1tpXJ button {\n    font-size: 12px;\n    background-color: transparent;\n    border: none;\n    color: #fff;\n    cursor: pointer; }\n    .styles-module__mobileBurger_1tpXJ button:focus {\n      outline: 0; }\n    .styles-module__mobileBurger_1tpXJ button div {\n      font-size: 12px; }\n\n.styles-module__mobileMenu_LrN6n {\n  display: block;\n  position: absolute;\n  overflow-x: auto;\n  left: 0;\n  z-index: 1;\n  bottom: 20px;\n  width: 180px;\n  margin: 0 15px;\n  padding: 0px;\n  background-color: #212121;\n  transition: 0.3s; }\n  .styles-module__mobileMenu_LrN6n button {\n    height: 30px;\n    font-size: 12px; }\n\n.styles-module__main_1SV4D {\n  width: 100%; }\n", ""]);
// Exports
exports.locals = {
	"hiddenText": "styles-module__hiddenText_2j9DH",
	"closeButton": "styles-module__closeButton_1VZS3",
	"photo": "styles-module__photo_W8rUI",
	"mobileMenu": "styles-module__mobileMenu_LrN6n",
	"active": "styles-module__active_2tWBU",
	"user": "styles-module__user_14WZZ",
	"name": "styles-module__name_3zYmq",
	"role": "styles-module__role_1bSMh",
	"mobileBurger": "styles-module__mobileBurger_1tpXJ",
	"main": "styles-module__main_1SV4D"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/styles.module.scss":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/styles.module.scss ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__mainPageWrapper_1Fgra {\n  position: relative;\n  display: flex;\n  width: 90%;\n  flex-direction: column;\n  background-color: #262626;\n  margin-bottom: 20px; }\n  .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo {\n    display: flex;\n    flex-direction: row;\n    padding: 15px;\n    text-align: center; }\n    .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I {\n      width: 100%; }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__textHeader_2Uopr h1 {\n        font-size: 70px;\n        color: #fff;\n        margin-bottom: 0px; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__textHeader_2Uopr h1 b {\n          color: #ed1d24; }\n        @media screen and (max-width: 576px) {\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__textHeader_2Uopr h1 {\n            font-size: 40px; } }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__textHeader_2Uopr p {\n        color: #a0a0a0;\n        font-size: 20px;\n        margin: 0; }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__paginationBlock_tX0uw {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__paginationBlock_tX0uw .styles-module__tabs_3Cixd ul {\n          list-style: none;\n          padding: 0;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          flex-wrap: wrap; }\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__paginationBlock_tX0uw .styles-module__tabs_3Cixd ul li {\n            height: 120px;\n            width: 120px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            color: #fff;\n            background: #212121;\n            border-radius: 50%;\n            font-size: 60px;\n            margin: 25px 15px;\n            transition: 0.3s;\n            cursor: pointer; }\n            .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__paginationBlock_tX0uw .styles-module__tabs_3Cixd ul li.styles-module__active_1F7fr {\n              font-size: 70px;\n              transition: 0.3s;\n              height: 124px;\n              width: 124px;\n              margin: 23px 13px;\n              background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__paginationBlock_tX0uw .styles-module__tabContext_dtUli {\n          color: #a0a0a0;\n          max-width: 500px;\n          text-align: justify; }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__buttonsBlock_2grYV {\n        display: flex;\n        justify-content: center;\n        align-items: center; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__buttonsBlock_2grYV .styles-module__button_3dADH {\n          cursor: pointer;\n          border: 0;\n          border-radius: 2px;\n          padding: 13px 20px;\n          background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n          font-size: 16px;\n          color: #fff;\n          outline: none;\n          font-weight: 600;\n          line-height: 1.5;\n          transition: all 2s;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          width: 220px;\n          height: 70px;\n          margin: 25px 0;\n          font-size: 30px;\n          padding: 0px; }\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I .styles-module__buttonsBlock_2grYV .styles-module__button_3dADH:hover {\n            background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n    .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll {\n      display: none;\n      width: 60%;\n      position: relative;\n      -ms-overflow-style: none; }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__pcBlock_29eZ8 {\n        width: 750px;\n        height: 450px;\n        position: absolute;\n        border: 0%;\n        background-size: 100% 100%;\n        overflow: hidden;\n        right: 15px;\n        top: 150px;\n        display: none; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__pcBlock_29eZ8 img {\n          width: 100%; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__pcBlock_29eZ8 .styles-module__pcContext_CqPWL {\n          overflow-y: scroll;\n          box-sizing: content-box;\n          margin: 33px 0px 0px 95px;\n          background-size: 100%;\n          width: 560px;\n          height: 360px; }\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__pcBlock_29eZ8 .styles-module__pcContext_CqPWL::-webkit-scrollbar {\n            display: none; }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U {\n        position: absolute;\n        width: 160px;\n        height: 350px;\n        bottom: 100px;\n        border: 0%;\n        border-radius: 30px;\n        background-color: #262626;\n        background-size: 100% 100%;\n        margin-left: 0px;\n        padding: 26px 25px 20px 25px;\n        overflow: hidden; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U > img {\n          position: absolute;\n          z-index: 0;\n          top: 0;\n          left: 0;\n          height: 100%; }\n        .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 {\n          border: 50px;\n          width: 100%;\n          height: 100%;\n          overflow-y: scroll;\n          padding-right: 17px;\n          box-sizing: content-box; }\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input {\n            border: 0;\n            border-bottom: 1px solid #515151;\n            border-radius: 0;\n            outline: none;\n            padding: 6px 0;\n            color: #fff;\n            background: transparent;\n            font-weight: 400;\n            font-size: 18px;\n            transition: border-bottom .3s;\n            line-height: 1.5;\n            width: 100%;\n            font-size: 12px; }\n            .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input:hover, .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input:focus {\n              border-bottom: 1px solid #ff8c05; }\n            .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input:-webkit-autofill, .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input:-webkit-autofill:hover, .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input:-webkit-autofill:focus, .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 input:-webkit-autofill:active {\n              transition: background-color 5000s ease-in-out 0s;\n              -webkit-text-fill-color: #fff; }\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0 img {\n            width: 100%; }\n          .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U .styles-module__phoneContext_2bTH0::-webkit-scrollbar {\n            display: none; }\n  .styles-module__mainPageWrapper_1Fgra .styles-module__arrowDown_2l0E5 {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: #a0a0a0;\n    font-size: 30px;\n    animation: styles-module__arrow_DkEKD 2s infinite;\n    cursor: pointer; }\n\n@keyframes styles-module__arrow_DkEKD {\n  0% {\n    margin: 25px 0; }\n  50% {\n    margin: 35px 0 15px 0; }\n  100% {\n    margin: 25px 0; } }\n  @media screen and (min-width: 900px) {\n    .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll {\n      display: block;\n      position: relative;\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U {\n        top: 50px; } }\n  @media screen and (min-width: 1500px) {\n    .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__leftBlock_1yb-I {\n      width: 40%; }\n    .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__pcBlock_29eZ8 {\n      display: block;\n      top: 50px; }\n    .styles-module__mainPageWrapper_1Fgra .styles-module__mainBlock_2F8Zo .styles-module__rightBlock_Py5ll .styles-module__phoneBlock_2os6U {\n      left: 0; } }\n", ""]);
// Exports
exports.locals = {
	"mainPageWrapper": "styles-module__mainPageWrapper_1Fgra",
	"mainBlock": "styles-module__mainBlock_2F8Zo",
	"leftBlock": "styles-module__leftBlock_1yb-I",
	"textHeader": "styles-module__textHeader_2Uopr",
	"paginationBlock": "styles-module__paginationBlock_tX0uw",
	"tabs": "styles-module__tabs_3Cixd",
	"active": "styles-module__active_1F7fr",
	"tabContext": "styles-module__tabContext_dtUli",
	"buttonsBlock": "styles-module__buttonsBlock_2grYV",
	"button": "styles-module__button_3dADH",
	"rightBlock": "styles-module__rightBlock_Py5ll",
	"pcBlock": "styles-module__pcBlock_29eZ8",
	"pcContext": "styles-module__pcContext_CqPWL",
	"phoneBlock": "styles-module__phoneBlock_2os6U",
	"phoneContext": "styles-module__phoneContext_2bTH0",
	"arrowDown": "styles-module__arrowDown_2l0E5",
	"arrow": "styles-module__arrow_DkEKD"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/account/styles.module.scss":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/account/styles.module.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__account_leuM4 {\n  margin-top: 50px;\n  padding: 0; }\n  .styles-module__account_leuM4 .styles-module__password_xaKFN {\n    width: 100%; }\n    .styles-module__account_leuM4 .styles-module__password_xaKFN input {\n      border: 0;\n      border-bottom: 1px solid #515151;\n      border-radius: 0;\n      outline: none;\n      padding: 6px 0;\n      color: #fff;\n      background: transparent;\n      font-weight: 400;\n      font-size: 18px;\n      transition: border-bottom .3s;\n      line-height: 1.5;\n      width: 100%;\n      margin: 15px 0; }\n      .styles-module__account_leuM4 .styles-module__password_xaKFN input:hover, .styles-module__account_leuM4 .styles-module__password_xaKFN input:focus {\n        border-bottom: 1px solid #ff8c05; }\n      .styles-module__account_leuM4 .styles-module__password_xaKFN input:-webkit-autofill, .styles-module__account_leuM4 .styles-module__password_xaKFN input:-webkit-autofill:hover, .styles-module__account_leuM4 .styles-module__password_xaKFN input:-webkit-autofill:focus, .styles-module__account_leuM4 .styles-module__password_xaKFN input:-webkit-autofill:active {\n        transition: background-color 5000s ease-in-out 0s;\n        -webkit-text-fill-color: #fff; }\n    .styles-module__account_leuM4 .styles-module__password_xaKFN .styles-module__invalidFeedback_Briyq {\n      color: #d61a5e;\n      margin-top: 5px;\n      width: 100%; }\n  .styles-module__account_leuM4 .styles-module__buttonsBlock_1cmSV {\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap; }\n    .styles-module__account_leuM4 .styles-module__buttonsBlock_1cmSV div {\n      display: flex;\n      flex-wrap: wrap; }\n    .styles-module__account_leuM4 .styles-module__buttonsBlock_1cmSV button {\n      cursor: pointer;\n      border: 0;\n      border-radius: 2px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 16px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      height: 50px;\n      text-align: center;\n      margin: 25px 15px 15px 0;\n      color: #fff;\n      border: none; }\n      .styles-module__account_leuM4 .styles-module__buttonsBlock_1cmSV button:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__account_leuM4 .styles-module__paymentBtn_eMDjG {\n    cursor: pointer;\n    border: 0;\n    border-radius: 2px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 16px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 50px;\n    text-align: center;\n    margin: 45px 15px 15px 5%;\n    color: #fff;\n    border: none; }\n    .styles-module__account_leuM4 .styles-module__paymentBtn_eMDjG:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  @media screen and (min-width: 320px) {\n    .styles-module__account_leuM4 {\n      width: 94%;\n      padding: 0 3%; } }\n  @media screen and (min-width: 1200px) {\n    .styles-module__account_leuM4 {\n      width: 550px;\n      padding: 0; } }\n", ""]);
// Exports
exports.locals = {
	"account": "styles-module__account_leuM4",
	"password": "styles-module__password_xaKFN",
	"invalidFeedback": "styles-module__invalidFeedback_Briyq",
	"buttonsBlock": "styles-module__buttonsBlock_1cmSV",
	"paymentBtn": "styles-module__paymentBtn_eMDjG"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/courses/styles.module.scss":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/courses/styles.module.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__separator_1YE8k {\n  width: 40%;\n  height: 3px;\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n  margin: 15px 30%; }\n\n.styles-module__courses_22Umd {\n  display: flex;\n  width: 100%;\n  flex-wrap: wrap; }\n  .styles-module__courses_22Umd a {\n    text-decoration: none; }\n  .styles-module__courses_22Umd .styles-module__card_eiQbS {\n    width: 250px;\n    background-color: #212121;\n    border-radius: 5px;\n    overflow: hidden;\n    margin: 15px; }\n    .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__cardType_18SIb {\n      position: absolute;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 50px;\n      width: 50px;\n      margin: 5px;\n      border-radius: 50%;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      color: #fff; }\n    .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__imgBlock_IKj7r {\n      height: 200px;\n      width: 100%;\n      background: center / auto 100% no-repeat;\n      transition: 0.3s; }\n    .styles-module__courses_22Umd .styles-module__card_eiQbS:hover .styles-module__imgBlock_IKj7r {\n      background-size: auto 110%;\n      transition: 0.3s; }\n    .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__courseName_1uACE {\n      margin: 15px;\n      color: #fff;\n      text-align: center; }\n    .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__progressBar_12zR3 {\n      height: 25px;\n      margin: 15px 5px;\n      border-radius: 2px;\n      background: linear-gradient(135deg, #ff8c0552 0%, #d61a5e59 100%);\n      overflow: hidden; }\n      .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__progressBar_12zR3 .styles-module__currentProgress_1h574 {\n        height: 100%;\n        background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n    .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__button_uj4qG {\n      cursor: pointer;\n      border: 0;\n      border-radius: 2px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 16px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      margin: 0px;\n      width: 100%; }\n      .styles-module__courses_22Umd .styles-module__card_eiQbS .styles-module__button_uj4qG:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__courses_22Umd .styles-module__addNewCourseCard_3FJf1,\n  .styles-module__courses_22Umd .styles-module__findNewCourseCard_3UIPS {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column;\n    overflow: hidden;\n    background-color: #212121;\n    width: 250px;\n    min-height: 250px;\n    margin: 15px;\n    border-radius: 5px;\n    border: none; }\n    .styles-module__courses_22Umd .styles-module__addNewCourseCard_3FJf1 div,\n    .styles-module__courses_22Umd .styles-module__findNewCourseCard_3UIPS div {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 100px;\n      height: 100px;\n      border-radius: 50%;\n      font-size: 100px;\n      color: #fff;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      cursor: pointer; }\n      .styles-module__courses_22Umd .styles-module__addNewCourseCard_3FJf1 div span,\n      .styles-module__courses_22Umd .styles-module__findNewCourseCard_3UIPS div span {\n        transform: rotate(0deg);\n        transition: 0.4s;\n        color: #fff; }\n    .styles-module__courses_22Umd .styles-module__addNewCourseCard_3FJf1 p,\n    .styles-module__courses_22Umd .styles-module__findNewCourseCard_3UIPS p {\n      color: #fff; }\n    .styles-module__courses_22Umd .styles-module__addNewCourseCard_3FJf1:hover div span,\n    .styles-module__courses_22Umd .styles-module__findNewCourseCard_3UIPS:hover div span {\n      transform: rotate(90deg);\n      transition: 0.4s; }\n  @media screen and (min-width: 320px) {\n    .styles-module__courses_22Umd {\n      display: flex;\n      justify-content: center;\n      max-width: 100%; } }\n  @media screen and (min-width: 1200px) {\n    .styles-module__courses_22Umd {\n      display: flex;\n      justify-content: start;\n      max-width: 560px; } }\n", ""]);
// Exports
exports.locals = {
	"separator": "styles-module__separator_1YE8k",
	"courses": "styles-module__courses_22Umd",
	"card": "styles-module__card_eiQbS",
	"cardType": "styles-module__cardType_18SIb",
	"imgBlock": "styles-module__imgBlock_IKj7r",
	"courseName": "styles-module__courseName_1uACE",
	"progressBar": "styles-module__progressBar_12zR3",
	"currentProgress": "styles-module__currentProgress_1h574",
	"button": "styles-module__button_uj4qG",
	"addNewCourseCard": "styles-module__addNewCourseCard_3FJf1",
	"findNewCourseCard": "styles-module__findNewCourseCard_3UIPS"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/profile/styles.module.scss":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/profile/styles.module.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__profile_2KVwt {\n  margin: 40px 15px 0 15px; }\n  .styles-module__profile_2KVwt input,\n  .styles-module__profile_2KVwt textarea {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 18px;\n    transition: border-bottom .3s;\n    line-height: 1.5;\n    background-color: transparent;\n    color: #fff; }\n    .styles-module__profile_2KVwt input:hover, .styles-module__profile_2KVwt input:focus,\n    .styles-module__profile_2KVwt textarea:hover,\n    .styles-module__profile_2KVwt textarea:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__profile_2KVwt input:-webkit-autofill, .styles-module__profile_2KVwt input:-webkit-autofill:hover, .styles-module__profile_2KVwt input:-webkit-autofill:focus, .styles-module__profile_2KVwt input:-webkit-autofill:active,\n    .styles-module__profile_2KVwt textarea:-webkit-autofill,\n    .styles-module__profile_2KVwt textarea:-webkit-autofill:hover,\n    .styles-module__profile_2KVwt textarea:-webkit-autofill:focus,\n    .styles-module__profile_2KVwt textarea:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n    .styles-module__profile_2KVwt input::placeholder,\n    .styles-module__profile_2KVwt textarea::placeholder {\n      color: #515151; }\n  .styles-module__profile_2KVwt .styles-module__invalidFeedback_2e3ER {\n    display: block;\n    word-wrap: break-word;\n    margin-top: 10px;\n    width: 100%;\n    color: #d61a5e; }\n  .styles-module__profile_2KVwt .styles-module__userFullName_2jBVg {\n    display: flex;\n    width: 100%; }\n    .styles-module__profile_2KVwt .styles-module__userFullName_2jBVg div {\n      width: 50%; }\n      .styles-module__profile_2KVwt .styles-module__userFullName_2jBVg div:first-child {\n        margin-right: 15px; }\n      .styles-module__profile_2KVwt .styles-module__userFullName_2jBVg div input {\n        width: 100%;\n        padding: 6px 0;\n        margin: 0; }\n  .styles-module__profile_2KVwt .styles-module__description_2Ob_3 {\n    margin-top: 15px;\n    width: 100%; }\n    .styles-module__profile_2KVwt .styles-module__description_2Ob_3 textarea {\n      width: 100%;\n      padding: 6px 0;\n      margin: 0;\n      resize: none; }\n  .styles-module__profile_2KVwt .styles-module__social_1LvOw {\n    margin-top: 15px;\n    width: 100%; }\n    .styles-module__profile_2KVwt .styles-module__social_1LvOw div div {\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      .styles-module__profile_2KVwt .styles-module__social_1LvOw div div svg {\n        font-size: 20px;\n        margin: 0 5px;\n        width: 10%; }\n      .styles-module__profile_2KVwt .styles-module__social_1LvOw div div .styles-module__facebookIcon_3GSLY {\n        color: #3b5998; }\n      .styles-module__profile_2KVwt .styles-module__social_1LvOw div div .styles-module__twitterIcon_kUJFh {\n        color: #1da1f2; }\n      .styles-module__profile_2KVwt .styles-module__social_1LvOw div div .styles-module__linkedinIcon_5rJPK {\n        color: #0073b0; }\n  .styles-module__profile_2KVwt .styles-module__buttonsBlock_lwVGX {\n    width: 100%; }\n    .styles-module__profile_2KVwt .styles-module__buttonsBlock_lwVGX button {\n      cursor: pointer;\n      border: 0;\n      border-radius: 2px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 16px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 100px;\n      height: 50px;\n      margin: 25px 15px 15px 0;\n      float: left; }\n      .styles-module__profile_2KVwt .styles-module__buttonsBlock_lwVGX button:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  @media screen and (min-width: 320px) {\n    .styles-module__profile_2KVwt .styles-module__social_1LvOw div input {\n      width: 100%;\n      margin: 10px 0; } }\n  @media screen and (min-width: 1200px) {\n    .styles-module__profile_2KVwt {\n      width: 540px; } }\n", ""]);
// Exports
exports.locals = {
	"profile": "styles-module__profile_2KVwt",
	"invalidFeedback": "styles-module__invalidFeedback_2e3ER",
	"userFullName": "styles-module__userFullName_2jBVg",
	"description": "styles-module__description_2Ob_3",
	"social": "styles-module__social_1LvOw",
	"facebookIcon": "styles-module__facebookIcon_3GSLY",
	"twitterIcon": "styles-module__twitterIcon_kUJFh",
	"linkedinIcon": "styles-module__linkedinIcon_5rJPK",
	"buttonsBlock": "styles-module__buttonsBlock_lwVGX"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/settings/styles.module.scss":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/settings/styles.module.scss ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__settings_1nWT3 {\n  margin-top: 40px;\n  margin-left: 15px;\n  margin-bottom: 15px; }\n  .styles-module__settings_1nWT3 .styles-module__localization_3L4aV {\n    width: 100%; }\n    .styles-module__settings_1nWT3 .styles-module__localization_3L4aV select {\n      width: 250px;\n      margin: 15px 5px;\n      background-color: transparent;\n      padding: 15px;\n      border: 3px #212121 solid;\n      color: #fff;\n      cursor: pointer; }\n      .styles-module__settings_1nWT3 .styles-module__localization_3L4aV select option {\n        background-color: #262626;\n        cursor: pointer; }\n  .styles-module__settings_1nWT3 ul {\n    list-style-type: none;\n    margin-left: 0;\n    padding-left: 5px;\n    color: #fff; }\n    .styles-module__settings_1nWT3 ul li {\n      margin: 10px 0; }\n  .styles-module__settings_1nWT3 button {\n    cursor: pointer;\n    border: 0;\n    border-radius: 2px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 16px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-left: 5px; }\n    .styles-module__settings_1nWT3 button:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P {\n    position: absolute;\n    opacity: 0; }\n    .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P + label {\n      position: relative;\n      cursor: pointer;\n      padding: 0; }\n    .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P + label:before {\n      content: '';\n      margin-right: 10px;\n      display: inline-block;\n      vertical-align: text-top;\n      width: 20px;\n      height: 20px;\n      background: #fff; }\n    .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P:hover + label:before {\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n    .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P:focus + label:before {\n      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12); }\n    .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P:checked + label:before {\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n    .styles-module__settings_1nWT3 .styles-module__styledCheckbox_1cD3P:checked + label:after {\n      content: '';\n      position: absolute;\n      left: 5px;\n      top: 9px;\n      background: #fff;\n      width: 2px;\n      height: 2px;\n      box-shadow: 2px 0 0 #fff, 4px 0 0 #fff, 4px -2px 0 #fff, 4px -4px 0 #fff, 4px -6px 0 #fff, 4px -8px 0 #fff;\n      transform: rotate(45deg); }\n", ""]);
// Exports
exports.locals = {
	"settings": "styles-module__settings_1nWT3",
	"localization": "styles-module__localization_3L4aV",
	"styledCheckbox": "styles-module__styledCheckbox_1cD3P"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/styles.module.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/styles.module.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__profile_2vMe5 {\n  background-color: #262626; }\n  .styles-module__profile_2vMe5 * {\n    outline: none; }\n  .styles-module__profile_2vMe5 .styles-module__button_D26pA {\n    background: transparent;\n    outline: none;\n    cursor: pointer; }\n    .styles-module__profile_2vMe5 .styles-module__button_D26pA:hover {\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      transition: 0.3s; }\n  .styles-module__profile_2vMe5 .styles-module__activeButton_1MgeI {\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n  .styles-module__profile_2vMe5 .styles-module__hiddenText_2RCVg {\n    display: none; }\n  .styles-module__profile_2vMe5 .styles-module__closeButton_ZszLX svg {\n    font-size: 30px;\n    color: #ff8c05; }\n  .styles-module__profile_2vMe5 .styles-module__photo_2ue9D {\n    width: 200px;\n    height: 200px;\n    background-image: url(https://www.ktk.kz/getimage/mainpagebig/111099);\n    margin: 15px;\n    position: relative;\n    left: 50%;\n    margin-left: -100px;\n    background-size: auto 100%;\n    border-radius: 50%;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-color: #000;\n    border: 2px #262626 solid; }\n  .styles-module__profile_2vMe5 .styles-module__menu_1P0av ul,\n  .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE ul {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n  .styles-module__profile_2vMe5 .styles-module__menu_1P0av button,\n  .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE button {\n    width: 100%;\n    height: 100px;\n    background-color: #262626;\n    border: none;\n    border-top: 3px #212121 solid;\n    color: #fff; }\n    .styles-module__profile_2vMe5 .styles-module__menu_1P0av button.styles-module__active_1H3Fr,\n    .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE button.styles-module__active_1H3Fr {\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n  .styles-module__profile_2vMe5 .styles-module__menu_1P0av .styles-module__user_2nDXu,\n  .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE .styles-module__user_2nDXu {\n    text-align: center;\n    margin-bottom: 15px; }\n    .styles-module__profile_2vMe5 .styles-module__menu_1P0av .styles-module__user_2nDXu .styles-module__name_CNhb7,\n    .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE .styles-module__user_2nDXu .styles-module__name_CNhb7 {\n      color: #fff;\n      font-size: 20px;\n      font-weight: 100; }\n    .styles-module__profile_2vMe5 .styles-module__menu_1P0av .styles-module__user_2nDXu .styles-module__role_vTx2G,\n    .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE .styles-module__user_2nDXu .styles-module__role_vTx2G {\n      font-size: 18px;\n      color: #515151; }\n  @media screen and (min-width: 320px) {\n    .styles-module__profile_2vMe5 {\n      display: block;\n      width: 86%;\n      padding: 15px 2%;\n      margin-bottom: 20px; }\n      .styles-module__profile_2vMe5 .styles-module__mobileBurger_3FWFH {\n        display: block;\n        text-align: center;\n        padding: 15px 0; }\n        .styles-module__profile_2vMe5 .styles-module__mobileBurger_3FWFH button {\n          font-size: 40px;\n          background-color: transparent;\n          border: none;\n          color: #fff; }\n          .styles-module__profile_2vMe5 .styles-module__mobileBurger_3FWFH button div {\n            font-size: 20px; }\n      .styles-module__profile_2vMe5 .styles-module__menu_1P0av {\n        display: none; }\n      .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE {\n        display: block;\n        width: 100%;\n        padding: 0px;\n        margin-left: -105%;\n        position: absolute;\n        overflow-x: auto;\n        background-color: #212121;\n        left: 0;\n        transition: 0.3s;\n        z-index: 1; }\n        .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE button {\n          height: 50px; }\n      .styles-module__profile_2vMe5 .styles-module__main_32ylP {\n        width: 100%; } }\n  @media screen and (min-width: 1200px) {\n    .styles-module__profile_2vMe5 {\n      display: flex;\n      width: 100%;\n      max-width: 900px;\n      margin-bottom: 20px;\n      padding: 15px 0; }\n      .styles-module__profile_2vMe5 .styles-module__mobileBurger_3FWFH {\n        display: none; }\n      .styles-module__profile_2vMe5 .styles-module__mobileMenu_3-btE {\n        display: none; }\n      .styles-module__profile_2vMe5 .styles-module__menu_1P0av {\n        display: block;\n        width: 300px;\n        padding: 15px; }\n      .styles-module__profile_2vMe5 .styles-module__main_32ylP {\n        width: 600px; } }\n", ""]);
// Exports
exports.locals = {
	"profile": "styles-module__profile_2vMe5",
	"button": "styles-module__button_D26pA",
	"activeButton": "styles-module__activeButton_1MgeI",
	"hiddenText": "styles-module__hiddenText_2RCVg",
	"closeButton": "styles-module__closeButton_ZszLX",
	"photo": "styles-module__photo_2ue9D",
	"menu": "styles-module__menu_1P0av",
	"mobileMenu": "styles-module__mobileMenu_3-btE",
	"active": "styles-module__active_1H3Fr",
	"user": "styles-module__user_2nDXu",
	"name": "styles-module__name_CNhb7",
	"role": "styles-module__role_vTx2G",
	"mobileBurger": "styles-module__mobileBurger_3FWFH",
	"main": "styles-module__main_32ylP"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/sources/styles.module.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/sources/styles.module.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__mainPageWrapper_2pZvW {\n  display: flex;\n  width: 90%;\n  height: 100vh;\n  background-color: #262626; }\n", ""]);
// Exports
exports.locals = {
	"mainPageWrapper": "styles-module__mainPageWrapper_2pZvW"
};

/***/ }),

/***/ "./public/assets/google.svg":
/*!**********************************!*\
  !*** ./public/assets/google.svg ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


/* harmony default export */ __webpack_exports__["default"] = (({
  styles = {},
  ...props
}) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
  viewBox: "0 0 366 372",
  xmlns: "http://www.w3.org/2000/svg"
}, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z",
  fill: "#EA4335"
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z",
  fill: "#FBBC05"
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z",
  fill: "#4285F4"
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z",
  fill: "#34A853"
})));

/***/ }),

/***/ "./public/assets/iPhone.png":
/*!**********************************!*\
  !*** ./public/assets/iPhone.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "22f976c4b20995a3581ebf59c739fd22.png";

/***/ }),

/***/ "./public/assets/iPhoneLeft.png":
/*!**************************************!*\
  !*** ./public/assets/iPhoneLeft.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "13cff760bd2188912962aa9147ee72f7.png";

/***/ }),

/***/ "./public/assets/laptop.png":
/*!**********************************!*\
  !*** ./public/assets/laptop.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ba379ac12518dc9e01f7dbcd976da162.png";

/***/ }),

/***/ "./public/assets/laptopScreen.png":
/*!****************************************!*\
  !*** ./public/assets/laptopScreen.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6d0a64be8510152afd8e431b556a6b4e.png";

/***/ }),

/***/ "./public/assets/linkedin.svg":
/*!************************************!*\
  !*** ./public/assets/linkedin.svg ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


/* harmony default export */ __webpack_exports__["default"] = (({
  styles = {},
  ...props
}) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
  viewBox: "0 0 30 30"
}, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M3.442 0a3.44 3.44 0 11-.004 6.88A3.44 3.44 0 013.442 0zM.472 9.489H6.41v19.089H.471V9.488zM10 9.473h5.687v2.61h.082C16.56 10.583 18.496 9 21.38 9c6.008 0 7.118 3.952 7.118 9.093v10.47h-5.932v-9.284c0-2.213-.038-5.061-3.083-5.061-3.087 0-3.558 2.412-3.558 4.903v9.441H10V9.473"
})));

/***/ }),

/***/ "./public/assets/logoLight.png":
/*!*************************************!*\
  !*** ./public/assets/logoLight.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c6445644fbcc5f96f614592cb059dcd2.png";

/***/ }),

/***/ "./src/actions/auth.js":
/*!*****************************!*\
  !*** ./src/actions/auth.js ***!
  \*****************************/
/*! exports provided: registerRequest, loginRequest, loginSuccess, loginFailure, logOutRequest, logOutSuccess, socialLoginRequest, socialLoginSuccess, socialLoginFailure, refreshLoginRequest, refreshLoginSuccess, refreshLoginFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerRequest", function() { return registerRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRequest", function() { return loginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginSuccess", function() { return loginSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginFailure", function() { return loginFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOutRequest", function() { return logOutRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOutSuccess", function() { return logOutSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "socialLoginRequest", function() { return socialLoginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "socialLoginSuccess", function() { return socialLoginSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "socialLoginFailure", function() { return socialLoginFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshLoginRequest", function() { return refreshLoginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshLoginSuccess", function() { return refreshLoginSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshLoginFailure", function() { return refreshLoginFailure; });
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-actions */ "./node_modules/redux-actions/es/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/actions/types.js");


var registerRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].REGISTER_REQUEST);
var loginRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].LOGIN_REQUEST);
var loginSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].LOGIN_SUCCESS);
var loginFailure = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].LOGIN_FAILURE);
var logOutRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].LOGOUT_REQUEST);
var logOutSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].LOGOUT_SUCCESS);
var socialLoginRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].SOCIAL_LOGIN_REQUEST);
var socialLoginSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].SOCIAL_LOGIN_SUCCESS);
var socialLoginFailure = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].SOCIAL_LOGIN_FAILURE);
var refreshLoginRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].REFRESH_LOGIN_REQUEST);
var refreshLoginSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].REFRESH_LOGIN_SUCCESS);
var refreshLoginFailure = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["auth"].REFRESH_LOGIN_FAILURE);


/***/ }),

/***/ "./src/actions/profile.js":
/*!********************************!*\
  !*** ./src/actions/profile.js ***!
  \********************************/
/*! exports provided: getProfileRequest, getProfileSuccess, getProfileFailure, updateProfileRequest, updateProfileSuccess, updateProfileFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfileRequest", function() { return getProfileRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfileSuccess", function() { return getProfileSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfileFailure", function() { return getProfileFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProfileRequest", function() { return updateProfileRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProfileSuccess", function() { return updateProfileSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProfileFailure", function() { return updateProfileFailure; });
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-actions */ "./node_modules/redux-actions/es/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/actions/types.js");


var getProfileRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["profile"].GET_PROFILE_REQUEST);
var getProfileSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["profile"].GET_PROFILE_SUCCESS);
var getProfileFailure = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["profile"].GET_PROFILE_FAILURE);
var updateProfileRequest = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["profile"].UPDATE_PROFILE_REQUEST);
var updateProfileSuccess = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["profile"].UPDATE_PROFILE_SUCCESS);
var updateProfileFailure = Object(redux_actions__WEBPACK_IMPORTED_MODULE_0__["createAction"])(_types__WEBPACK_IMPORTED_MODULE_1__["profile"].UPDATE_PROFILE_FAILURE);


/***/ }),

/***/ "./src/actions/types.js":
/*!******************************!*\
  !*** ./src/actions/types.js ***!
  \******************************/
/*! exports provided: auth, profile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return auth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "profile", function() { return profile; });
var auth = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  SOCIAL_LOGIN_REQUEST: 'SOCIAL_LOGIN_REQUEST',
  SOCIAL_LOGIN_SUCCESS: 'SOCIAL_LOGIN_SUCCESS',
  SOCIAL_LOGIN_FAILURE: 'SOCIAL_LOGIN_FAILURE',
  REFRESH_LOGIN_REQUEST: 'REFRESH_LOGIN_REQUEST',
  REFRESH_LOGIN_SUCCESS: 'REFRESH_LOGIN_SUCCESS',
  REFRESH_LOGIN_FAILURE: 'REFRESH_LOGIN_FAILURE'
};
var profile = {
  GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILURE: 'GET_PROFILE_FAILURE',
  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE'
};

/***/ }),

/***/ "./src/components/app.js":
/*!*******************************!*\
  !*** ./src/components/app.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var _containers_header__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../containers/header */ "./src/containers/header/index.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./main */ "./src/components/main/index.js");
/* harmony import */ var _footer_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./footer/index */ "./src/components/footer/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16__);

















var history = Object(history__WEBPACK_IMPORTED_MODULE_11__["createBrowserHistory"])();

var App =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(App)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "componentDidMount", function () {
      _this.props.refreshLoginRequest();
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.page
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["BrowserRouter"], {
        history: history
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_containers_header__WEBPACK_IMPORTED_MODULE_12__["default"], null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_main__WEBPACK_IMPORTED_MODULE_13__["Main"], null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_footer_index__WEBPACK_IMPORTED_MODULE_14__["Footer"], null)));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

App.propTypes = {
  refreshLoginRequest: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func.isRequired
};
var mapDispatchToProps = {
  refreshLoginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_15__["refreshLoginRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(null, mapDispatchToProps)(App));

/***/ }),

/***/ "./src/components/footer/index.js":
/*!****************************************!*\
  !*** ./src/components/footer/index.js ***!
  \****************************************/
/*! exports provided: Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../public/assets/logoLight.png */ "./public/assets/logoLight.png");
/* harmony import */ var _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/footer/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_4__);





var Footer = function Footer() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.footer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: ""
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "We are remarkable"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\xA9 2019 :iTechArt All Rights Reserved.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.socialMediaContainer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Follow us on"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: _utils_constants__WEBPACK_IMPORTED_MODULE_2__["links"].iTechVK
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.socialMedia
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaVk"], null)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: _utils_constants__WEBPACK_IMPORTED_MODULE_2__["links"].iTechYoutube
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.socialMedia
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaYoutube"], null)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: _utils_constants__WEBPACK_IMPORTED_MODULE_2__["links"].iTechFacebook
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.socialMedia
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaFacebookSquare"], null)))))));
};

/***/ }),

/***/ "./src/components/footer/styles.module.scss":
/*!**************************************************!*\
  !*** ./src/components/footer/styles.module.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/components/help/courseTaking/index.js":
/*!***************************************************!*\
  !*** ./src/components/help/courseTaking/index.js ***!
  \***************************************************/
/*! exports provided: CourseTaking */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseTaking", function() { return CourseTaking; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../scss/common/helpPage.scss */ "./src/scss/common/helpPage.scss");
/* harmony import */ var _scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1__);


var CourseTaking = function CourseTaking() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "helpPage"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
};

/***/ }),

/***/ "./src/components/help/gettingStarted/index.js":
/*!*****************************************************!*\
  !*** ./src/components/help/gettingStarted/index.js ***!
  \*****************************************************/
/*! exports provided: GettingStarted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GettingStarted", function() { return GettingStarted; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../scss/common/helpPage.scss */ "./src/scss/common/helpPage.scss");
/* harmony import */ var _scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1__);


var GettingStarted = function GettingStarted() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "helpPage"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
};

/***/ }),

/***/ "./src/components/help/index.js":
/*!**************************************!*\
  !*** ./src/components/help/index.js ***!
  \**************************************/
/*! exports provided: Help */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Help", function() { return Help; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/help/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);




var Help = function Help() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Help"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/getting-started",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardLink
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaClipboardList"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Getting Started"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Learn how our courses works and how to start learning"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-public",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardLink
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaUser"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Account/Profile"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Manage your account settings"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/troubleshooting",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardLink
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaCogs"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Troubleshooting"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Experiencing a bug? Check here"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/course-taking",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardLink
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaBook"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Course Taking"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Everything about taking our course"))));
};

/***/ }),

/***/ "./src/components/help/styles.module.scss":
/*!************************************************!*\
  !*** ./src/components/help/styles.module.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/help/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/help/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/help/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/components/help/troubleshooting/index.js":
/*!******************************************************!*\
  !*** ./src/components/help/troubleshooting/index.js ***!
  \******************************************************/
/*! exports provided: Trobleshooting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trobleshooting", function() { return Trobleshooting; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../scss/common/helpPage.scss */ "./src/scss/common/helpPage.scss");
/* harmony import */ var _scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_common_helpPage_scss__WEBPACK_IMPORTED_MODULE_1__);


var Trobleshooting = function Trobleshooting() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "helpPage"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
};

/***/ }),

/***/ "./src/components/layout/index.js":
/*!****************************************!*\
  !*** ./src/components/layout/index.js ***!
  \****************************************/
/*! exports provided: Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _containers_mainPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../containers/mainPage */ "./src/containers/mainPage/index.js");
/* harmony import */ var _containers_couresCarousel_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../containers/couresCarousel/index */ "./src/containers/couresCarousel/index.js");
/* harmony import */ var _help__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../help */ "./src/components/help/index.js");




var Layout = function Layout() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_mainPage__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_couresCarousel_index__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_help__WEBPACK_IMPORTED_MODULE_3__["Help"], null));
};

/***/ }),

/***/ "./src/components/main/index.js":
/*!**************************************!*\
  !*** ./src/components/main/index.js ***!
  \**************************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout */ "./src/components/layout/index.js");
/* harmony import */ var _help_gettingStarted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../help/gettingStarted */ "./src/components/help/gettingStarted/index.js");
/* harmony import */ var _containers_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../containers/profile */ "./src/containers/profile/index.jsx");
/* harmony import */ var _help_troubleshooting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../help/troubleshooting */ "./src/components/help/troubleshooting/index.js");
/* harmony import */ var _help_courseTaking__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../help/courseTaking */ "./src/components/help/courseTaking/index.js");
/* harmony import */ var _containers_auth_resetPassword__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../containers/auth/resetPassword */ "./src/containers/auth/resetPassword/index.js");
/* harmony import */ var _containers_sources__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../containers/sources */ "./src/containers/sources/index.js");
/* harmony import */ var _containers_categories__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../containers/categories */ "./src/containers/categories/index.js");










var Main = function Main() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/",
    component: _layout__WEBPACK_IMPORTED_MODULE_2__["Layout"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/sources",
    component: _containers_sources__WEBPACK_IMPORTED_MODULE_8__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/categories",
    component: _containers_categories__WEBPACK_IMPORTED_MODULE_9__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/getting-started",
    component: _help_gettingStarted__WEBPACK_IMPORTED_MODULE_3__["GettingStarted"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/troubleshooting",
    component: _help_troubleshooting__WEBPACK_IMPORTED_MODULE_5__["Trobleshooting"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/course-taking",
    component: _help_courseTaking__WEBPACK_IMPORTED_MODULE_6__["CourseTaking"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/reset",
    component: _containers_auth_resetPassword__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_profile__WEBPACK_IMPORTED_MODULE_4__["ProfileRouters"], null));
};

/***/ }),

/***/ "./src/components/modal/index.js":
/*!***************************************!*\
  !*** ./src/components/modal/index.js ***!
  \***************************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/modal/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_4__);





react_modal__WEBPACK_IMPORTED_MODULE_1___default.a.setAppElement('#root');
var Modal = function Modal(_ref) {
  var open = _ref.open,
      onClose = _ref.onClose,
      children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_modal__WEBPACK_IMPORTED_MODULE_1___default.a, {
    style: {
      overlay: {
        zIndex: 2
      }
    },
    isOpen: open,
    onRequestClose: onClose,
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.modal
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaTimes"], {
    onClick: onClose,
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.closeModal
  }), children);
};
Modal.propTypes = {
  open: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
};

/***/ }),

/***/ "./src/components/modal/styles.module.scss":
/*!*************************************************!*\
  !*** ./src/components/modal/styles.module.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/modal/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/modal/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/modal/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/components/privateRoute/index.js":
/*!**********************************************!*\
  !*** ./src/components/privateRoute/index.js ***!
  \**********************************************/
/*! exports provided: PrivateRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateRoute", function() { return PrivateRoute; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_validToken__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/validToken */ "./src/utils/validToken.js");






var PrivateRoute = function PrivateRoute(_ref) {
  var Component = _ref.component,
      pathName = _ref.pathName,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, ["component", "pathName"]);

  var valid = Object(_utils_validToken__WEBPACK_IMPORTED_MODULE_5__["isTokenValid"])();
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {
    render: function render(props) {
      return valid ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, props)) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: {
          pathName: pathName,
          state: {
            from: props.location
          }
        }
      });
    }
  }));
};
PrivateRoute.defaultProps = {
  pathName: '/'
};
PrivateRoute.propTypes = {
  pathName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string
};

/***/ }),

/***/ "./src/components/spinner/index.js":
/*!*****************************************!*\
  !*** ./src/components/spinner/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/spinner/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__);








var Spinner =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Spinner, _PureComponent);

  function Spinner() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Spinner);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Spinner).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Spinner, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.spinnerWrapper
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.spinner
      }));
    }
  }]);

  return Spinner;
}(react__WEBPACK_IMPORTED_MODULE_5__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (Spinner);

/***/ }),

/***/ "./src/components/spinner/styles.module.scss":
/*!***************************************************!*\
  !*** ./src/components/spinner/styles.module.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/spinner/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/spinner/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/spinner/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/components/styles.module.scss":
/*!*******************************************!*\
  !*** ./src/components/styles.module.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/auth/forgotPassword/index.js":
/*!*****************************************************!*\
  !*** ./src/containers/auth/forgotPassword/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/auth */ "./src/services/auth.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/modal */ "./src/components/modal/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/auth/forgotPassword/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16__);


















var ForgotPassword =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ForgotPassword, _PureComponent);

  function ForgotPassword() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ForgotPassword);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ForgotPassword)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      email: null,
      pending: false,
      message: null,
      errors: {},
      success: false
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "preValidateForm", function (_ref) {
      var email = _ref.email;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_13__["emailValidate"])(email);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9___default()(errors)) {
        _this.setState({
          errors: errors
        });

        return false;
      }

      return true;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "send",
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
        var email, valid, _ref3, status, message;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                email = _this.state.email;
                valid = _this.preValidateForm({
                  email: email
                });

                if (!valid) {
                  _context.next = 11;
                  break;
                }

                _this.setState({
                  pending: true,
                  message: null
                });

                _context.next = 7;
                return Object(_services_auth__WEBPACK_IMPORTED_MODULE_12__["forgotPasswordRequest"])({
                  email: email
                });

              case 7:
                _ref3 = _context.sent;
                status = _ref3.status;
                message = _ref3.message;

                _this.setState({
                  pending: false,
                  message: message,
                  success: status === 200
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "modalClose", function () {
      var onModalClose = _this.props.onModalClose;
      onModalClose(false);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onChangeInput", function (e) {
      _this.setState({
        email: e.target.value,
        errors: {},
        message: null,
        success: false
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ForgotPassword, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          pending = _this$state.pending,
          message = _this$state.message,
          errors = _this$state.errors,
          success = _this$state.success;
      var modalStatus = this.props.modalStatus;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_15__["Modal"], {
        open: modalStatus,
        onClose: this.modalClose
      }, !pending && !success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("form", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.input,
        placeholder: "Enter Email",
        name: "forgot-password-id",
        id: "forgot-password-id",
        type: "email",
        onChange: this.onChangeInput,
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.errorMessage
      }, errors.email || message), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        type: "button",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.btn),
        onClick: this.send
      }, "Send")), pending && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_14__["default"], {
        loading: pending
      })), !pending && message && success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.form, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.successMessage)
      }, message));
    }
  }]);

  return ForgotPassword;
}(react__WEBPACK_IMPORTED_MODULE_10__["PureComponent"]);

ForgotPassword.propTypes = {
  modalStatus: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool.isRequired,
  onModalClose: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ForgotPassword);

/***/ }),

/***/ "./src/containers/auth/forgotPassword/styles.module.scss":
/*!***************************************************************!*\
  !*** ./src/containers/auth/forgotPassword/styles.module.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/forgotPassword/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/forgotPassword/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/forgotPassword/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/auth/login/index.js":
/*!********************************************!*\
  !*** ./src/containers/auth/login/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/modal */ "./src/components/modal/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _public_assets_google_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../public/assets/google.svg */ "./public/assets/google.svg");
/* harmony import */ var _public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../public/assets/linkedin.svg */ "./public/assets/linkedin.svg");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../styles.module.scss */ "./src/containers/auth/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_19__);





















var Login =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Login, _Component);

  function Login() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Login);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Login)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      email: '',
      password: '',
      errors: {}
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "closeModal", function () {
      var onModalClose = _this.props.onModalClose;
      onModalClose(false);

      _this.setState({
        email: '',
        password: '',
        errors: {}
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "openForgotPasswordModal", function () {
      var _this$props = _this.props,
          onModalClose = _this$props.onModalClose,
          onModalCloseForgotPass = _this$props.onModalCloseForgotPass;
      onModalClose(false);
      onModalCloseForgotPass(true);

      _this.setState({
        email: '',
        password: '',
        errors: {}
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onChange", function (event) {
      _this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({}, event.target.name, event.target.value));
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSubmit", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
          email = _this$state.email,
          password = _this$state.password;
      var _this$props2 = _this.props,
          loginRequest = _this$props2.loginRequest,
          onModalClose = _this$props2.onModalClose;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_15__["loginValidate"])(email, password);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(errors)) {
        _this.setState({
          errors: errors
        });
      } else {
        var request = new Promise(function (resolve, reject) {
          loginRequest({
            email: email,
            password: password,
            resolve: resolve,
            reject: reject
          });
        });
        request.then(function () {
          onModalClose(false);

          _this.setState({
            errors: {}
          });
        }, function (errors) {
          _this.setState({
            errors: errors
          });
        });
      }
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Login, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          location = _this$props3.location,
          history = _this$props3.history;
      var parsed = query_string__WEBPACK_IMPORTED_MODULE_12___default.a.parse(location.search);

      if (parsed.token) {
        this.props.socialLoginRequest(parsed.token);
        history.push('/');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          email = _this$state2.email,
          password = _this$state2.password,
          errors = _this$state2.errors;
      var modalStatus = this.props.modalStatus;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_13__["Modal"], {
        open: modalStatus,
        onClose: this.closeModal
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h2", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.title
      }, "Sign In"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.onSubmit,
        noValidate: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "email",
        id: "email",
        name: "email",
        value: email,
        placeholder: "Email Address",
        onChange: this.onChange
      }), (errors.email || errors.status === 404) && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.invalidFeedback
      }, errors.email ? errors.email : errors.message), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "password",
        id: "password",
        name: "password",
        value: password,
        placeholder: "Password",
        onChange: this.onChange
      }), (errors.password || errors.status === 403) && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.invalidFeedback
      }, errors.password ? errors.password : errors.message), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.socialButtonsContainer
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_16__["links"].googleURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.googleButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.googleButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_google_svg__WEBPACK_IMPORTED_MODULE_17__["default"], null)))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_16__["links"].linkedInURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.linkedinButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.linkedinButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_18__["default"], null))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.submit
      }, "Sign In"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        onClick: this.openForgotPasswordModal,
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.linkForgot
      }, "Forgot Password?"))));
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

Login.propTypes = {
  loginRequest: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  socialLoginRequest: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  onModalClose: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  modalStatus: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool.isRequired
};
var mapDispatchToProps = {
  loginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_14__["loginRequest"],
  socialLoginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_14__["socialLoginRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(null, mapDispatchToProps)(Login)));

/***/ }),

/***/ "./src/containers/auth/register/index.js":
/*!***********************************************!*\
  !*** ./src/containers/auth/register/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/modal */ "./src/components/modal/index.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _public_assets_google_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../public/assets/google.svg */ "./public/assets/google.svg");
/* harmony import */ var _public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../public/assets/linkedin.svg */ "./public/assets/linkedin.svg");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../styles.module.scss */ "./src/containers/auth/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_19__);





















var Register =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Register, _Component);

  function Register() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Register);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Register)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "closeModal", function () {
      _this.props.onModalClose(false);

      _this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {}
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onChange", function (event) {
      _this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({}, event.target.name, event.target.value));
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSubmit", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
          firstName = _this$state.firstName,
          lastName = _this$state.lastName,
          email = _this$state.email,
          password = _this$state.password,
          confirmPassword = _this$state.confirmPassword;
      var _this$props = _this.props,
          registerRequest = _this$props.registerRequest,
          onModalClose = _this$props.onModalClose;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_14__["registerValidate"])(firstName, lastName, email, password, confirmPassword);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(errors)) {
        _this.setState({
          errors: errors
        });
      } else {
        var request = new Promise(function (resolve, reject) {
          registerRequest({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            resolve: resolve,
            reject: reject
          });
        });
        request.then(function () {
          onModalClose(false);

          _this.setState({
            errors: {}
          });
        }, function (errors) {
          _this.setState({
            errors: errors
          });
        });
      }
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Register, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          location = _this$props2.location,
          history = _this$props2.history;
      var parsed = query_string__WEBPACK_IMPORTED_MODULE_12___default.a.parse(location.search);

      if (parsed.token) {
        this.props.socialLoginRequest(parsed.token);
        history.push('/');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          firstName = _this$state2.firstName,
          lastName = _this$state2.lastName,
          email = _this$state2.email,
          password = _this$state2.password,
          confirmPassword = _this$state2.confirmPassword,
          errors = _this$state2.errors;
      var modalStatus = this.props.modalStatus;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_13__["Modal"], {
        open: modalStatus,
        onClose: this.closeModal
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h2", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.title
      }, "Sign Up"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.onSubmit,
        noValidate: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "text",
        id: "firstName",
        name: "firstName",
        value: firstName,
        placeholder: "First Name",
        onChange: this.onChange
      }), errors.firstName && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.invalidFeedback
      }, errors.firstName), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "text",
        id: "lastName",
        name: "lastName",
        value: lastName,
        placeholder: "Last Name",
        onChange: this.onChange
      }), errors.lastName && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.invalidFeedback
      }, errors.lastName), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "email",
        id: "email",
        name: "email",
        value: email,
        placeholder: "Email Address",
        onChange: this.onChange
      }), (errors.email || errors.status === 400) && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.invalidFeedback
      }, errors.email ? errors.email : errors.message), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "password",
        id: "password",
        name: "password",
        value: password,
        placeholder: "Password",
        onChange: this.onChange
      }), errors.password && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.invalidFeedback
      }, errors.password), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "password",
        id: "confirmPassword",
        name: "confirmPassword",
        value: confirmPassword,
        placeholder: "Confirm Password",
        onChange: this.onChange
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.socialButtonsContainer
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_16__["links"].googleURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.googleButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.googleButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_google_svg__WEBPACK_IMPORTED_MODULE_17__["default"], null)))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_16__["links"].linkedInURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.linkedinButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.linkedinButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_18__["default"], null))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_19___default.a.submit
      }, "Sign Up"))));
    }
  }]);

  return Register;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

Register.propTypes = {
  registerRequest: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  socialLoginRequest: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  onModalClose: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired,
  modalStatus: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool.isRequired
};
var mapDispatchToProps = {
  registerRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_15__["registerRequest"],
  socialLoginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_15__["socialLoginRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(null, mapDispatchToProps)(Register)));

/***/ }),

/***/ "./src/containers/auth/resetPassword/index.js":
/*!****************************************************!*\
  !*** ./src/containers/auth/resetPassword/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/auth */ "./src/services/auth.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/auth/resetPassword/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16__);


















var ResetPassword =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ResetPassword, _PureComponent);

  function ResetPassword() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ResetPassword);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ResetPassword)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      password: null,
      passwordConfirm: null,
      success: false,
      pending: false,
      message: null,
      token: null,
      redirect: false,
      errors: {}
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "preValidateForm", function (_ref) {
      var password = _ref.password,
          passwordConfirm = _ref.passwordConfirm;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_14__["changePasswordValidate"])(password, passwordConfirm);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9___default()(errors)) {
        _this.setState({
          errors: errors
        });

        return false;
      }

      return true;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "sendReset",
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
        var _this$state, token, passwordConfirm, password, valid, _ref3, status, message;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                _this$state = _this.state, token = _this$state.token, passwordConfirm = _this$state.passwordConfirm, password = _this$state.password;
                valid = _this.preValidateForm({
                  password: password,
                  passwordConfirm: passwordConfirm
                });

                if (!valid) {
                  _context.next = 12;
                  break;
                }

                _this.setState({
                  pending: true,
                  message: null,
                  success: false
                });

                _context.next = 7;
                return Object(_services_auth__WEBPACK_IMPORTED_MODULE_13__["resetPassword"])({
                  token: token,
                  password: password,
                  confirmPassword: passwordConfirm
                });

              case 7:
                _ref3 = _context.sent;
                status = _ref3.status;
                message = _ref3.message;

                _this.setState({
                  pending: false,
                  message: message,
                  success: status === 200
                });

                setTimeout(function () {
                  _this.setState({
                    redirect: true
                  });
                }, 1500);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onChangeInput", function (e) {
      _this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()({
        errors: {},
        message: null,
        success: false
      }, e.target.name, e.target.value));
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ResetPassword, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _queryString$parse = query_string__WEBPACK_IMPORTED_MODULE_11___default.a.parse(location.search),
          token = _queryString$parse.id;

      this.setState({
        token: token
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          pending = _this$state2.pending,
          message = _this$state2.message,
          errors = _this$state2.errors,
          success = _this$state2.success,
          redirect = _this$state2.redirect;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.wrapperForm
      }, !pending && !success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("form", {
        name: "resetPasswordForm",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Enter Password",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.input, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.row),
        onChange: this.onChangeInput,
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
        type: "password",
        name: "passwordConfirm",
        id: "passwordConfirm",
        placeholder: "Confirm Password",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.input, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.row),
        onChange: this.onChangeInput,
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.row, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.errorMessage)
      }, errors.password || message), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        type: "submit",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.btn),
        onClick: this.sendReset
      }, "Push")), pending && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_15__["default"], {
        loading: pending
      })), !pending && success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.form, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.successMessage)
      }, message)), redirect && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_12__["Redirect"], {
        to: {
          pathname: '/',
          state: {
            from: this.props.location
          }
        }
      }));
    }
  }]);

  return ResetPassword;
}(react__WEBPACK_IMPORTED_MODULE_10__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (ResetPassword);

/***/ }),

/***/ "./src/containers/auth/resetPassword/styles.module.scss":
/*!**************************************************************!*\
  !*** ./src/containers/auth/resetPassword/styles.module.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/resetPassword/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/resetPassword/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/resetPassword/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/auth/styles.module.scss":
/*!************************************************!*\
  !*** ./src/containers/auth/styles.module.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/auth/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/categories/index.js":
/*!********************************************!*\
  !*** ./src/containers/categories/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/categories/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_9__);











var Categories =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Categories, _Component);

  function Categories() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Categories);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Categories)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {});

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Categories, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("main", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_9___default.a.mainPageWrapper
      }, "Categories");
    }
  }]);

  return Categories;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Categories));

/***/ }),

/***/ "./src/containers/categories/styles.module.scss":
/*!******************************************************!*\
  !*** ./src/containers/categories/styles.module.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/categories/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/categories/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/categories/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/couresCarousel/index.js":
/*!************************************************!*\
  !*** ./src/containers/couresCarousel/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-alice-carousel */ "./node_modules/react-alice-carousel/lib/react-alice-carousel.js");
/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/io */ "./node_modules/react-icons/io/index.esm.js");
/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-alice-carousel/lib/alice-carousel.css */ "./node_modules/react-alice-carousel/lib/alice-carousel.css");
/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/couresCarousel/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_11__);












var responsive = {
  1800: {
    items: 5
  },
  1430: {
    items: 4
  },
  1070: {
    items: 3
  },
  730: {
    items: 2
  },
  370: {
    items: 1
  }
};

var CoursesCarousel =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CoursesCarousel, _Component);

  function CoursesCarousel() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CoursesCarousel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CoursesCarousel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "galleryItems", function () {
      return Array(12).fill().map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.courseCardContainer
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
          type: "button",
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.addingButton
        }, "+"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("figure", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.image
        }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.name
        }, "React js"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.duration
        }, "Duration: 35d ", i), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
          type: "button"
        }, "View"));
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "nextItem", function () {
      _this.Carousel.slideNext();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "prevItem", function () {
      _this.Carousel.slidePrev();
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CoursesCarousel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("section", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.carouselContainer
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.navButton,
        type: "button",
        onClick: this.prevItem
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_9__["IoIosArrowBack"], {
        color: "white",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.carouselArrows
      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.carousel
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_alice_carousel__WEBPACK_IMPORTED_MODULE_8___default.a, {
        items: this.galleryItems(),
        mouseDragEnabled: true,
        infinite: false,
        responsive: responsive,
        buttonsDisabled: true,
        ref: function ref(el) {
          return _this2.Carousel = el;
        }
      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.navButton,
        type: "button",
        onClick: this.nextItem
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_9__["IoIosArrowForward"], {
        color: "white",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.carouselArrows
      })));
    }
  }]);

  return CoursesCarousel;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (CoursesCarousel);

/***/ }),

/***/ "./src/containers/couresCarousel/styles.module.scss":
/*!**********************************************************!*\
  !*** ./src/containers/couresCarousel/styles.module.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/couresCarousel/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/couresCarousel/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/couresCarousel/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/header/index.js":
/*!****************************************!*\
  !*** ./src/containers/header/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/md */ "./node_modules/react-icons/md/index.esm.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _auth_login__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../auth/login */ "./src/containers/auth/login/index.js");
/* harmony import */ var _auth_register__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../auth/register */ "./src/containers/auth/register/index.js");
/* harmony import */ var _auth_forgotPassword__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../auth/forgotPassword */ "./src/containers/auth/forgotPassword/index.js");
/* harmony import */ var _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../public/assets/logoLight.png */ "./public/assets/logoLight.png");
/* harmony import */ var _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/header/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./menu.scss */ "./src/containers/header/menu.scss");
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_menu_scss__WEBPACK_IMPORTED_MODULE_13__);















var Header = function Header(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(window.innerWidth),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      isOpenLog = _useState4[0],
      setModalStatusLog = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      isOpenReg = _useState6[0],
      setModalStatusReg = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState7, 2),
      isOpenMenu = _useState8[0],
      setMenuStatus = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState9, 2),
      isOpenForgotPass = _useState10[0],
      setModalForgotPass = _useState10[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var handleWidth = function handleWidth() {
      return setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWidth);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (width > 768) {
      var toggleElement = document.querySelector('#menu');
      toggleElement.classList.remove('mobileMenuActive');
      setMenuStatus(false);
    }
  });

  var toggleMenuFunc = function toggleMenuFunc() {
    if (width <= 768) {
      var toggleElement = document.querySelector('#menu');
      toggleElement.classList.toggle('mobileMenuActive');
    }
  };

  var closeLoginModal = function closeLoginModal() {
    setModalStatusLog(false);
  };

  var closeRegModal = function closeRegModal() {
    setModalStatusReg(false);
  };

  var openModalLog = function openModalLog() {
    setModalStatusLog(true);
  };

  var openModalReg = function openModalReg() {
    setModalStatusReg(true);
  };

  var checkMobileMenuStatus = function checkMobileMenuStatus() {
    toggleMenuFunc();
    setMenuStatus(!isOpenMenu);
  };

  var isAuthenticated = props.isAuthenticated,
      logOutRequest = props.logOutRequest;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.header
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.logo
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: "/"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_11___default.a,
    alt: "Logo"
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.search
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "search"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_5__["MdSearch"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.icon
  })), width < 768 && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.menuIcons,
    onClick: checkMobileMenuStatus
  }, !isOpenMenu ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaBars"], null) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaWindowClose"], null)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "menu",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.menu
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    onClick: checkMobileMenuStatus
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: "/sources",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.link
  }, "Sources")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    onClick: checkMobileMenuStatus
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: "/categories",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.link
  }, "Categories")), isAuthenticated ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.buttonsBlock
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.button,
    onClick: logOutRequest
  }, "Log out")) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.buttonsBlock
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.button,
    onClick: openModalLog
  }, "Log in"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.button,
    onClick: openModalReg
  }, "Register")))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_login__WEBPACK_IMPORTED_MODULE_8__["default"], {
    modalStatus: isOpenLog,
    onModalClose: closeLoginModal,
    modalStatusForgotPass: isOpenForgotPass,
    onModalCloseForgotPass: setModalForgotPass
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_register__WEBPACK_IMPORTED_MODULE_9__["default"], {
    modalStatus: isOpenReg,
    onModalClose: closeRegModal
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_forgotPassword__WEBPACK_IMPORTED_MODULE_10__["default"], {
    modalStatus: isOpenForgotPass,
    onModalClose: setModalForgotPass
  }), width < 768 && isOpenMenu && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.outSideMenuClick,
    onClick: checkMobileMenuStatus
  }));
};

Header.propTypes = {
  logOutRequest: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired,
  isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

var mapDispatchToProps = {
  logOutRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_7__["logOutRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Header));

/***/ }),

/***/ "./src/containers/header/menu.scss":
/*!*****************************************!*\
  !*** ./src/containers/header/menu.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/header/styles.module.scss":
/*!**************************************************!*\
  !*** ./src/containers/header/styles.module.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/header/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/header/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/header/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/footer/index.jsx":
/*!******************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/footer/index.jsx ***!
  \******************************************************************/
/*! exports provided: Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/footer */ "./src/components/footer/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);



var Footer = function Footer() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.footer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_footer__WEBPACK_IMPORTED_MODULE_1__["Footer"], null));
};

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss":
/*!***************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/footer/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/header/burgerMenu/index.js":
/*!****************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/header/burgerMenu/index.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-icons/md */ "./node_modules/react-icons/md/index.esm.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_11__);













var Burger =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Burger, _Component);

  function Burger() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Burger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Burger)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      menuIsActive: false
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "burgerHandle", function () {
      _this.setState(function (state) {
        return {
          menuIsActive: !state.menuIsActive
        };
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "register", function () {
      _this.props.register();

      _this.burgerHandle();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "login", function () {
      _this.props.login();

      _this.burgerHandle();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "logout", function () {
      _this.props.logout();

      _this.burgerHandle();
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Burger, [{
    key: "render",
    value: function render() {
      var menuIsActive = this.state.menuIsActive;
      var isAuth = this.props.isAuth;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: menuIsActive ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.burgerActive : _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.burger,
        onClick: this.burgerHandle
      }), menuIsActive && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.clickOutside,
        onClick: this.burgerHandle
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.menu
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["NavLink"], {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.menuItem,
        to: "/sources"
      }, "Sources"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["NavLink"], {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.menuItem,
        to: "/categories"
      }, "Categories"), isAuth ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        type: "button",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.button,
        onClick: this.logout
      }, "Logout") : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        type: "button",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.button,
        onClick: this.login
      }, "Log in"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        type: "button",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.button,
        onClick: this.register
      }, "Register")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.search
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        type: "text",
        placeholder: "search"
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_10__["MdSearch"], {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.icon
      })))));
    }
  }]);

  return Burger;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

Burger.propTypes = {
  register: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  login: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  logout: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  isAuth: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Burger);

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss":
/*!**************************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/burgerMenu/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/header/index.jsx":
/*!******************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/header/index.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _burgerMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./burgerMenu */ "./src/containers/mainPage/iPhoneComponent/header/burgerMenu/index.js");
/* harmony import */ var _auth_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../auth/login */ "./src/containers/auth/login/index.js");
/* harmony import */ var _auth_register__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../auth/register */ "./src/containers/auth/register/index.js");
/* harmony import */ var _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../public/assets/logoLight.png */ "./public/assets/logoLight.png");
/* harmony import */ var _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/iPhoneComponent/header/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_10__);












var Header = function Header(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      isOpenLog = _useState2[0],
      setModalStatusLog = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      isOpenReg = _useState4[0],
      setModalStatusReg = _useState4[1];

  var closeLoginModal = function closeLoginModal() {
    setModalStatusLog(false);
  };

  var closeRegModal = function closeRegModal() {
    setModalStatusReg(false);
  };

  var openModalLog = function openModalLog() {
    setModalStatusLog(true);
  };

  var openModalReg = function openModalReg() {
    setModalStatusReg(true);
  };

  var isAuthenticated = props.isAuthenticated,
      logOutRequest = props.logOutRequest;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_10___default.a.header
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_10___default.a.logo
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: "/"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: _public_assets_logoLight_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    alt: "Logo"
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_burgerMenu__WEBPACK_IMPORTED_MODULE_6__["default"], {
    login: openModalLog,
    register: openModalReg,
    logout: logOutRequest,
    isAuth: isAuthenticated
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_login__WEBPACK_IMPORTED_MODULE_7__["default"], {
    modalStatus: isOpenLog,
    onModalClose: closeLoginModal
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_register__WEBPACK_IMPORTED_MODULE_8__["default"], {
    modalStatus: isOpenReg,
    onModalClose: closeRegModal
  }));
};

Header.propTypes = {
  logOutRequest: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func.isRequired,
  isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

var mapDispatchToProps = {
  logOutRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_5__["logOutRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Header));

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/header/styles.module.scss":
/*!***************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/header/styles.module.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/header/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/index.jsx":
/*!***********************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/index.jsx ***!
  \***********************************************************/
/*! exports provided: ProfileIphone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileIphone", function() { return ProfileIphone; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./src/containers/mainPage/iPhoneComponent/header/index.jsx");
/* harmony import */ var _profilePhoto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profilePhoto */ "./src/containers/mainPage/iPhoneComponent/profilePhoto/index.jsx");
/* harmony import */ var _profileInputs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profileInputs */ "./src/containers/mainPage/iPhoneComponent/profileInputs/index.jsx");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer */ "./src/containers/mainPage/iPhoneComponent/footer/index.jsx");





var ProfileIphone = function ProfileIphone() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profilePhoto__WEBPACK_IMPORTED_MODULE_2__["ProfilePhoto"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profileInputs__WEBPACK_IMPORTED_MODULE_3__["ProfileInputs"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_footer__WEBPACK_IMPORTED_MODULE_4__["Footer"], null));
};

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/profileInputs/index.jsx":
/*!*************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/profileInputs/index.jsx ***!
  \*************************************************************************/
/*! exports provided: ProfileInputs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileInputs", function() { return ProfileInputs; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);




var ProfileInputs = function ProfileInputs() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      update = _useState2[0],
      setUpdate = _useState2[1];

  var updateProfile = function updateProfile() {
    setUpdate(!update);
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.profile
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.userFio
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "First name",
    disabled: update,
    defaultValue: "John"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "Last name",
    disabled: update,
    defaultValue: "Doe"
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.description
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "Description",
    disabled: update
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.social
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaTwitter"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.twitterIcon
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "twitter nick",
    disabled: update,
    defaultValue: "johntwitt"
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaFacebookF"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.facebookIcon
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "facebook nick",
    disabled: update,
    defaultValue: "jhondoe"
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaLinkedinIn"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.linkedinIcon
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "linkedin nick",
    disabled: update
  }))), update ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: updateProfile
  }, "Update") : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: updateProfile
  }, "Save"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: updateProfile
  }, "Close")));
};

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss":
/*!**********************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profileInputs/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/profilePhoto/index.jsx":
/*!************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/profilePhoto/index.jsx ***!
  \************************************************************************/
/*! exports provided: ProfilePhoto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePhoto", function() { return ProfilePhoto; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_4__);





var ProfilePhoto = function ProfilePhoto() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('-105%'),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      menu = _useState2[0],
      setMenu = _useState2[1];

  var toggleMenu = function toggleMenu() {
    if (menu === '15px') {
      setMenu('-105%');
    } else {
      setMenu('15px');
    }
  };

  var closeMenu = function closeMenu() {
    setMenu('-105%');
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.mobileBurger
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: toggleMenu
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.photo
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.name
  }, "John Doe"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.role
  }, "student"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("nav", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.mobileMenu,
    style: {
      marginLeft: menu
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/profile/public"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button"
  }, "Public"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/profile/courses"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button"
  }, "Courses"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/profile/account"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button"
  }, "Account"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/profile/settings"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button"
  }, "Settings"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.closeButton,
    onClick: closeMenu
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__["FaWindowClose"], null))))));
};

/***/ }),

/***/ "./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss":
/*!*********************************************************************************!*\
  !*** ./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/iPhoneComponent/profilePhoto/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/mainPage/index.js":
/*!******************************************!*\
  !*** ./src/containers/mainPage/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-icons/io */ "./node_modules/react-icons/io/index.esm.js");
/* harmony import */ var _iPhoneComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./iPhoneComponent */ "./src/containers/mainPage/iPhoneComponent/index.jsx");
/* harmony import */ var _public_assets_laptop_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../public/assets/laptop.png */ "./public/assets/laptop.png");
/* harmony import */ var _public_assets_laptop_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_public_assets_laptop_png__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _public_assets_laptopScreen_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../public/assets/laptopScreen.png */ "./public/assets/laptopScreen.png");
/* harmony import */ var _public_assets_laptopScreen_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_public_assets_laptopScreen_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _public_assets_iPhone_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../public/assets/iPhone.png */ "./public/assets/iPhone.png");
/* harmony import */ var _public_assets_iPhone_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_public_assets_iPhone_png__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _public_assets_iPhoneLeft_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../public/assets/iPhoneLeft.png */ "./public/assets/iPhoneLeft.png");
/* harmony import */ var _public_assets_iPhoneLeft_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_public_assets_iPhoneLeft_png__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_16__);


















var MainPage =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(MainPage, _Component);

  function MainPage() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MainPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(MainPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      activeTab: 0
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "tabsHandler", function (tabsNum) {
      _this.setState({
        activeTab: tabsNum
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MainPage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("main", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.mainPageWrapper
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.mainBlock
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.leftBlock
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.textHeader
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h1", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("b", null, "Tech"), "courses"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, "description")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.paginationBlock
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.tabs
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        className: this.state.activeTab === 0 ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.active : '',
        onClick: function onClick() {
          return _this2.tabsHandler(0);
        }
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaCode"], null)), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        className: this.state.activeTab === 1 ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.active : '',
        onClick: function onClick() {
          return _this2.tabsHandler(1);
        }
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_10__["IoIosRocket"], null)), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("li", {
        className: this.state.activeTab === 2 ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.active : '',
        onClick: function onClick() {
          return _this2.tabsHandler(2);
        }
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaLaptopCode"], null)))), this.state.activeTab === 0 && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.tabContext
      }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 1"), this.state.activeTab === 1 && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.tabContext
      }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 2"), this.state.activeTab === 2 && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.tabContext
      }, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 3")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.buttonsBlock
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.button
      }, "Start now"))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.rightBlock
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.pcBlock,
        style: {
          backgroundImage: "url(".concat(_public_assets_laptop_png__WEBPACK_IMPORTED_MODULE_12___default.a, ")")
        }
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.pcContext
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("img", {
        src: _public_assets_laptopScreen_png__WEBPACK_IMPORTED_MODULE_13___default.a,
        alt: "Laptop"
      }))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.phoneBlock,
        style: {
          backgroundImage: "url(".concat(_public_assets_iPhone_png__WEBPACK_IMPORTED_MODULE_14___default.a, ")")
        }
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("img", {
        src: _public_assets_iPhoneLeft_png__WEBPACK_IMPORTED_MODULE_15___default.a,
        alt: "iPhone"
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.phoneContext
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_iPhoneComponent__WEBPACK_IMPORTED_MODULE_11__["ProfileIphone"], null))))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_16___default.a.arrowDown
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaAngleDoubleDown"], null)));
    }
  }]);

  return MainPage;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(MainPage));

/***/ }),

/***/ "./src/containers/mainPage/styles.module.scss":
/*!****************************************************!*\
  !*** ./src/containers/mainPage/styles.module.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/profile/account/index.jsx":
/*!**************************************************!*\
  !*** ./src/containers/profile/account/index.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../profile */ "./src/containers/profile/profile.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/auth */ "./src/services/auth.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/account/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_12__);














var Account =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Account, _Component);

  function Account() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Account);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Account)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      password: '',
      confirmPassword: '',
      update: true,
      errors: {}
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSubmit", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
          password = _this$state.password,
          confirmPassword = _this$state.confirmPassword;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_10__["changePasswordValidate"])(password, confirmPassword);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(errors)) {
        _this.setState({
          errors: errors
        });
      } else {
        _this.setState({
          password: '',
          confirmPassword: '',
          errors: {},
          update: !_this.state.update
        });

        Object(_services_auth__WEBPACK_IMPORTED_MODULE_11__["changePassword"])({
          password: password
        });
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onChange", function (event) {
      _this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({}, event.target.name, event.target.value));
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "updatePassword", function () {
      _this.setState({
        update: false
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "closeUpdate", function () {
      _this.setState({
        password: '',
        confirmPassword: '',
        update: true,
        errors: {}
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Account, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          password = _this$state2.password,
          confirmPassword = _this$state2.confirmPassword,
          errors = _this$state2.errors,
          update = _this$state2.update;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_profile__WEBPACK_IMPORTED_MODULE_9__["Profile"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.account
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.onSubmit
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.password
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "password",
        id: "password",
        name: "password",
        value: password,
        placeholder: "Password",
        disabled: update,
        onChange: this.onChange
      }), errors.password && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
      }, errors.password)), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.password
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "password",
        id: "confirmPassword",
        name: "confirmPassword",
        value: confirmPassword,
        placeholder: "Confirm Password",
        disabled: update,
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.buttonsBlock
      }, update ? react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "button",
        onClick: this.updatePassword
      }, "Update password"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "button",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.paymentBtn
      }, "Add payment data")) : react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit"
      }, "Save"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "button",
        onClick: this.closeUpdate
      }, "Close"))))));
    }
  }]);

  return Account;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Account);

/***/ }),

/***/ "./src/containers/profile/account/styles.module.scss":
/*!***********************************************************!*\
  !*** ./src/containers/profile/account/styles.module.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/account/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/account/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/account/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/profile/courses/addNewCourseCard.jsx":
/*!*************************************************************!*\
  !*** ./src/containers/profile/courses/addNewCourseCard.jsx ***!
  \*************************************************************/
/*! exports provided: AddNewCourseCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNewCourseCard", function() { return AddNewCourseCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/courses/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);


var AddNewCourseCard = function AddNewCourseCard() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.addNewCourseCard
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "+")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Add new course"));
};

/***/ }),

/***/ "./src/containers/profile/courses/courseCard.jsx":
/*!*******************************************************!*\
  !*** ./src/containers/profile/courses/courseCard.jsx ***!
  \*******************************************************/
/*! exports provided: CourseCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseCard", function() { return CourseCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _subscribedCourseCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscribedCourseCard */ "./src/containers/profile/courses/subscribedCourseCard.jsx");
/* harmony import */ var _createdCourseCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createdCourseCard */ "./src/containers/profile/courses/createdCourseCard.jsx");
/* harmony import */ var _findNewCourseCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findNewCourseCard */ "./src/containers/profile/courses/findNewCourseCard.jsx");
/* harmony import */ var _addNewCourseCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addNewCourseCard */ "./src/containers/profile/courses/addNewCourseCard.jsx");






var CourseCard = function CourseCard(courseProps) {
  var course = courseProps.course,
      subscribed = courseProps.subscribed,
      created = courseProps.created,
      addCourse = courseProps.addCourse,
      findCourse = courseProps.findCourse;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, subscribed && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_subscribedCourseCard__WEBPACK_IMPORTED_MODULE_2__["SubscribedCourseCard"], {
    course: course
  }), created && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_createdCourseCard__WEBPACK_IMPORTED_MODULE_3__["CreatedCourseCard"], {
    course: course
  }), addCourse && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_addNewCourseCard__WEBPACK_IMPORTED_MODULE_5__["AddNewCourseCard"], null), findCourse && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_findNewCourseCard__WEBPACK_IMPORTED_MODULE_4__["FindNewCourseCard"], null));
};
CourseCard.propTypes = {
  course: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  subscribed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  created: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  addCourse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  findCourse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

/***/ }),

/***/ "./src/containers/profile/courses/createdCourseCard.jsx":
/*!**************************************************************!*\
  !*** ./src/containers/profile/courses/createdCourseCard.jsx ***!
  \**************************************************************/
/*! exports provided: CreatedCourseCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatedCourseCard", function() { return CreatedCourseCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/courses/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);




var CreatedCourseCard = function CreatedCourseCard(_ref) {
  var course = _ref.course;
  var type = course.type,
      img = course.img,
      name = course.name,
      link = course.link;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.card
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardType
  }, type), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.imgBlock,
    style: {
      backgroundImage: "url(".concat(img, ")")
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.courseName
  }, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: link
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button
  }, "Continue")));
};
CreatedCourseCard.propTypes = {
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  img: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  link: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};

/***/ }),

/***/ "./src/containers/profile/courses/findNewCourseCard.jsx":
/*!**************************************************************!*\
  !*** ./src/containers/profile/courses/findNewCourseCard.jsx ***!
  \**************************************************************/
/*! exports provided: FindNewCourseCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindNewCourseCard", function() { return FindNewCourseCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/courses/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);


var FindNewCourseCard = function FindNewCourseCard() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.findNewCourseCard
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "+")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Find new course"));
};

/***/ }),

/***/ "./src/containers/profile/courses/index.jsx":
/*!**************************************************!*\
  !*** ./src/containers/profile/courses/index.jsx ***!
  \**************************************************/
/*! exports provided: Courses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Courses", function() { return Courses; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _courseCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./courseCard */ "./src/containers/profile/courses/courseCard.jsx");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../profile */ "./src/containers/profile/profile.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/courses/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);




var Courses = function Courses() {
  var subscribedCourses = [{
    type: 'Lab',
    img: 'https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png',
    name: 'React js',
    progress: '70%',
    link: ''
  }, {
    type: 'Lab',
    img: 'https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png',
    name: 'JavaScript',
    progress: '15%',
    link: ''
  }, {
    type: 'C',
    img: 'https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png',
    name: 'Angular 7',
    progress: '30%',
    link: ''
  }];
  var createdCourses = [{
    type: 'Y',
    img: 'https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png',
    name: 'JavaScript',
    link: ''
  }];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profile__WEBPACK_IMPORTED_MODULE_2__["Profile"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.courses
  }, subscribedCourses.map(function (course, key) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: key
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_courseCard__WEBPACK_IMPORTED_MODULE_1__["CourseCard"], {
      course: course,
      subscribed: true
    }));
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_courseCard__WEBPACK_IMPORTED_MODULE_1__["CourseCard"], {
    findCourse: true
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.separator
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.courses
  }, createdCourses.map(function (course, key) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: key
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_courseCard__WEBPACK_IMPORTED_MODULE_1__["CourseCard"], {
      course: course,
      created: true
    }));
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_courseCard__WEBPACK_IMPORTED_MODULE_1__["CourseCard"], {
    addCourse: true
  }))));
};

/***/ }),

/***/ "./src/containers/profile/courses/styles.module.scss":
/*!***********************************************************!*\
  !*** ./src/containers/profile/courses/styles.module.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/courses/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/courses/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/courses/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/profile/courses/subscribedCourseCard.jsx":
/*!*****************************************************************!*\
  !*** ./src/containers/profile/courses/subscribedCourseCard.jsx ***!
  \*****************************************************************/
/*! exports provided: SubscribedCourseCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscribedCourseCard", function() { return SubscribedCourseCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/courses/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);




var SubscribedCourseCard = function SubscribedCourseCard(_ref) {
  var course = _ref.course;
  var type = course.type,
      img = course.img,
      name = course.name,
      link = course.link,
      progress = course.progress;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.card
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.cardType
  }, type), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.imgBlock,
    style: {
      backgroundImage: "url(".concat(img, ")")
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.courseName
  }, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.progressBar
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.currentProgress,
    style: {
      width: progress
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: link
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button
  }, "Continue")));
};
SubscribedCourseCard.propTypes = {
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  img: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  link: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  progress: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};

/***/ }),

/***/ "./src/containers/profile/index.jsx":
/*!******************************************!*\
  !*** ./src/containers/profile/index.jsx ***!
  \******************************************/
/*! exports provided: ProfileRouters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileRouters", function() { return ProfileRouters; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_privateRoute__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/privateRoute */ "./src/components/privateRoute/index.js");
/* harmony import */ var _profile_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./profile/index */ "./src/containers/profile/profile/index.jsx");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./settings */ "./src/containers/profile/settings/index.jsx");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./account */ "./src/containers/profile/account/index.jsx");
/* harmony import */ var _courses__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./courses */ "./src/containers/profile/courses/index.jsx");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_12__);













var ProfileRouters =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ProfileRouters, _Component);

  function ProfileRouters() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ProfileRouters);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ProfileRouters).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ProfileRouters, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("section", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.profile
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_privateRoute__WEBPACK_IMPORTED_MODULE_7__["PrivateRoute"], {
        path: "/profile-public",
        component: _profile_index__WEBPACK_IMPORTED_MODULE_8__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_privateRoute__WEBPACK_IMPORTED_MODULE_7__["PrivateRoute"], {
        path: "/profile-courses",
        component: _courses__WEBPACK_IMPORTED_MODULE_11__["Courses"]
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_privateRoute__WEBPACK_IMPORTED_MODULE_7__["PrivateRoute"], {
        path: "/profile-account",
        component: _account__WEBPACK_IMPORTED_MODULE_10__["default"]
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_privateRoute__WEBPACK_IMPORTED_MODULE_7__["PrivateRoute"], {
        path: "/profile-settings",
        component: _settings__WEBPACK_IMPORTED_MODULE_9__["Settings"]
      })));
    }
  }]);

  return ProfileRouters;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/***/ }),

/***/ "./src/containers/profile/menu.scss":
/*!******************************************!*\
  !*** ./src/containers/profile/menu.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/menu.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/menu.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./menu.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/menu.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/profile/profile.js":
/*!*******************************************!*\
  !*** ./src/containers/profile/profile.js ***!
  \*******************************************/
/*! exports provided: Profile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profile", function() { return Profile; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu.scss */ "./src/containers/profile/menu.scss");
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_menu_scss__WEBPACK_IMPORTED_MODULE_4__);





var Profile = function Profile() {
  var currentTab = window.location.pathname;
  var toggleMenu = null;
  var tabs = {
    "public": '/profile-public',
    courses: '/profile-courses',
    account: '/profile-account',
    settings: '/profile-settings'
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    toggleMenu = document.querySelector('#toggleMenu');
  });

  var toggleMenuFunc = function toggleMenuFunc() {
    toggleMenu.classList.toggle('menuIsOpen');
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.hiddenText
  }, "Profile's page which include courses, settings, public profile, users's account"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.mobileBurger
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: toggleMenuFunc
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.photo
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.name
  }, "John Doe"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.role
  }, "student"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    id: "toggleMenu",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.mobileMenu
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-public"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs["public"] ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Public"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-courses"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.courses ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Courses"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-account"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.account ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Account"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-settings"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.settings ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Settings"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.closeButton,
    onClick: toggleMenuFunc
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__["FaWindowClose"], null))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.menu
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.user
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.photo
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.name
  }, "John Doe"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.role
  }, "student")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-public"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs["public"] ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Profile"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-courses"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.courses ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Courses"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-account"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.account ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Account"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-settings"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.settings ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "Settings")))))));
};

/***/ }),

/***/ "./src/containers/profile/profile/index.jsx":
/*!**************************************************!*\
  !*** ./src/containers/profile/profile/index.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var _validation_profile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../validation/profile */ "./src/validation/profile.js");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../actions/profile */ "./src/actions/profile.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../profile */ "./src/containers/profile/profile.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/profile/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_12__);




var _ProfileData$propType;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }












var ProfileData = function ProfileData(_ref) {
  var profile = _ref.profile,
      getProfileRequest = _ref.getProfileRequest,
      updateProfileRequest = _ref.updateProfileRequest,
      isProfileLoading = _ref.isProfileLoading;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(true),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      checked = _useState2[0],
      setCheck = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    firstName: '',
    lastName: '',
    description: '',
    twitterLink: '',
    facebookLink: '',
    linkedInLink: ''
  }),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      formData = _useState4[0],
      setFormData = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    firstName: '',
    lastName: '',
    description: '',
    twitterLink: '',
    facebookLink: '',
    linkedInLink: ''
  }),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState5, 2),
      errors = _useState6[0],
      setErrors = _useState6[1];

  var firstName = formData.firstName,
      lastName = formData.lastName,
      description = formData.description,
      twitterLink = formData.twitterLink,
      facebookLink = formData.facebookLink,
      linkedInLink = formData.linkedInLink;
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    getProfileRequest();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  var onChange = function onChange(e) {
    setFormData(_objectSpread({}, formData, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, e.target.name, e.target.value)));
  };

  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    var errors = Object(_validation_profile__WEBPACK_IMPORTED_MODULE_7__["publicProfileValidate"])(formData);

    if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(errors)) {
      setErrors(errors);
    } else {
      setErrors({});
      setCheck(!checked);
      updateProfileRequest(formData);
    }
  };

  var onCheck = function onCheck() {
    setCheck(!checked);
  };

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_profile__WEBPACK_IMPORTED_MODULE_10__["Profile"], null), isProfileLoading ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_11__["default"], null) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("form", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.profile,
    onSubmit: onSubmit,
    noValidate: true
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.userFullName
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "text",
    name: "firstName",
    value: firstName,
    placeholder: "First name",
    disabled: checked,
    onChange: onChange
  }), errors.firstName && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.firstName)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "text",
    name: "lastName",
    value: lastName,
    placeholder: "Last name",
    disabled: checked,
    onChange: onChange
  }), errors.lastName && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.lastName))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.description
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("textarea", {
    type: "text",
    rows: "4",
    name: "description",
    value: description,
    placeholder: "Description",
    disabled: checked,
    onChange: onChange
  }), errors.description && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.description)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.social
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaTwitter"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.twitterIcon
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "url",
    name: "twitterLink",
    value: twitterLink,
    placeholder: _utils_constants__WEBPACK_IMPORTED_MODULE_9__["links"].twitter,
    disabled: checked,
    onChange: onChange
  }), errors.twitterLink && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.twitterLink)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaFacebookF"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.facebookIcon
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "url",
    name: "facebookLink",
    value: facebookLink,
    placeholder: _utils_constants__WEBPACK_IMPORTED_MODULE_9__["links"].facebook,
    disabled: checked,
    onChange: onChange
  }), errors.facebookLink && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.facebookLink)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaLinkedinIn"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.linkedinIcon
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "url",
    name: "linkedInLink",
    value: linkedInLink,
    placeholder: _utils_constants__WEBPACK_IMPORTED_MODULE_9__["links"].linkedIn,
    disabled: checked,
    onChange: onChange
  }), errors.linkedInLink && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.linkedInLink)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.buttonsBlock
  }, checked ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
    type: "button",
    onClick: onCheck
  }, "Update")) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
    type: "submit"
  }, "Save"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
    type: "button",
    onClick: onCheck
  }, "Close")))));
};

ProfileData.propTypes = (_ProfileData$propType = {
  getProfileRequest: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired,
  updateProfileRequest: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired
}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ProfileData$propType, "updateProfileRequest", prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ProfileData$propType, "isProfileLoading", prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool.isRequired), _ProfileData$propType);

var mapStateToProps = function mapStateToProps(state) {
  return {
    profile: state.user.profile,
    isProfileLoading: state.user.isProfileLoading
  };
};

var mapDispatchToProps = {
  getProfileRequest: _actions_profile__WEBPACK_IMPORTED_MODULE_8__["getProfileRequest"],
  updateProfileRequest: _actions_profile__WEBPACK_IMPORTED_MODULE_8__["updateProfileRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(ProfileData));

/***/ }),

/***/ "./src/containers/profile/profile/styles.module.scss":
/*!***********************************************************!*\
  !*** ./src/containers/profile/profile/styles.module.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/profile/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/profile/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/profile/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/profile/settings/index.jsx":
/*!***************************************************!*\
  !*** ./src/containers/profile/settings/index.jsx ***!
  \***************************************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../profile */ "./src/containers/profile/profile.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/settings/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_2__);



var Settings = function Settings() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profile__WEBPACK_IMPORTED_MODULE_1__["Profile"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.settings
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.localization
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    name: "localization",
    id: ""
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "",
    defaultValue: true
  }, "ENG"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, "RUS"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button"
  }, "Teacher request"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.styledCheckbox,
    id: "styled-checkbox-1",
    type: "checkbox"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "styled-checkbox-1"
  }, "Checkbox 1")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.styledCheckbox,
    id: "styled-checkbox-2",
    type: "checkbox"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "styled-checkbox-2"
  }, "Checkbox 2"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button"
  }, "save")));
};

/***/ }),

/***/ "./src/containers/profile/settings/styles.module.scss":
/*!************************************************************!*\
  !*** ./src/containers/profile/settings/styles.module.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/settings/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/settings/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/settings/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/profile/styles.module.scss":
/*!***************************************************!*\
  !*** ./src/containers/profile/styles.module.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/profile/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/containers/sources/index.js":
/*!*****************************************!*\
  !*** ./src/containers/sources/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/sources/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_9__);











var Sources =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Sources, _Component);

  function Sources() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Sources);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Sources)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {});

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Sources, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("main", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_9___default.a.mainPageWrapper
      }, "Sources");
    }
  }]);

  return Sources;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Sources));

/***/ }),

/***/ "./src/containers/sources/styles.module.scss":
/*!***************************************************!*\
  !*** ./src/containers/sources/styles.module.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/sources/styles.module.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/sources/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/sources/styles.module.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/app */ "./src/components/app.js");
/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store/index */ "./src/store/index.js");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(normalize_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scss/base.scss */ "./src/scss/base.scss");
/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scss_base_scss__WEBPACK_IMPORTED_MODULE_6__);







var store = Object(_store_index__WEBPACK_IMPORTED_MODULE_4__["configureStore"])();
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
  store: store
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_app__WEBPACK_IMPORTED_MODULE_3__["default"], null)), document.getElementById('root'));

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/reducers/user.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  user: _user__WEBPACK_IMPORTED_MODULE_1__["default"]
}));

/***/ }),

/***/ "./src/reducers/user.js":
/*!******************************!*\
  !*** ./src/reducers/user.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-actions */ "./node_modules/redux-actions/es/index.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/types */ "./src/actions/types.js");


var _handleActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var initialState = {
  isAuthenticated: false,
  loading: true,
  data: null,
  profile: null,
  isProfileLoading: true
};

var loginSuccess = function loginSuccess(state, _ref) {
  var payload = _ref.payload;
  return _objectSpread({}, state, {
    isAuthenticated: true,
    loading: false,
    data: payload
  });
};

var loginFailure = function loginFailure(state) {
  return _objectSpread({}, state, {
    isAuthenticated: false,
    loading: false
  });
};

var logOutSuccess = function logOutSuccess(state) {
  return _objectSpread({}, state, {
    isAuthenticated: false,
    loading: false,
    data: null
  });
};

var profileSuccess = function profileSuccess(state, _ref2) {
  var payload = _ref2.payload;
  return _objectSpread({}, state, {
    profile: payload,
    isProfileLoading: false
  });
};

var profileFailure = function profileFailure(state) {
  return _objectSpread({}, state, {
    profile: null,
    isProfileLoading: false
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Object(redux_actions__WEBPACK_IMPORTED_MODULE_1__["handleActions"])((_handleActions = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].LOGIN_SUCCESS, loginSuccess), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].LOGIN_FAILURE, loginFailure), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].SOCIAL_LOGIN_SUCCESS, loginSuccess), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].SOCIAL_LOGIN_FAILURE, loginFailure), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].LOGOUT_SUCCESS, logOutSuccess), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].REFRESH_LOGIN_SUCCESS, loginSuccess), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["auth"].REFRESH_LOGIN_FAILURE, loginFailure), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["profile"].GET_PROFILE_SUCCESS, profileSuccess), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["profile"].GET_PROFILE_FAILURE, profileFailure), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["profile"].UPDATE_PROFILE_SUCCESS, profileSuccess), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_handleActions, _actions_types__WEBPACK_IMPORTED_MODULE_2__["profile"].UPDATE_PROFILE_FAILURE, profileFailure), _handleActions), initialState));

/***/ }),

/***/ "./src/sagas/auth.js":
/*!***************************!*\
  !*** ./src/sagas/auth.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _callee; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_storageService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/storageService */ "./src/services/storageService.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/types */ "./src/actions/types.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/auth */ "./src/services/auth.js");


var _marked =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(register),
    _marked2 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(login),
    _marked3 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(socialLogin),
    _marked4 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(logout),
    _marked5 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(refreshLogin),
    _marked6 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(_callee);








function register(_ref) {
  var payload, response;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_services_auth__WEBPACK_IMPORTED_MODULE_6__["registerRequest"], payload);

        case 4:
          response = _context.sent;
          _context.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["loginSuccess"](response));

        case 7:
          _context.next = 9;
          return payload.resolve();

        case 9:
          _context.next = 17;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          _context.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["loginFailure"](_context.t0));

        case 15:
          _context.next = 17;
          return payload.reject(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 11]]);
}

function login(_ref2) {
  var payload, response;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = _ref2.payload;
          _context2.prev = 1;
          _context2.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_services_auth__WEBPACK_IMPORTED_MODULE_6__["loginRequest"], payload);

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["loginSuccess"](response));

        case 7:
          _context2.next = 9;
          return payload.resolve();

        case 9:
          _context2.next = 17;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["loginFailure"]());

        case 15:
          _context2.next = 17;
          return payload.reject(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 11]]);
}

function socialLogin(payload) {
  var response;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function socialLogin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_services_auth__WEBPACK_IMPORTED_MODULE_6__["socialLoginRequest"], payload);

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["socialLoginSuccess"](response));

        case 6:
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["socialLoginFailure"]());

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 8]]);
}

function logout() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function logout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_services_auth__WEBPACK_IMPORTED_MODULE_6__["logOutRequest"]);

        case 2:
          _context4.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["logOutSuccess"]());

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function refreshLogin() {
  var token, user, currentTime;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function refreshLogin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = _services_storageService__WEBPACK_IMPORTED_MODULE_3__["storageWrapper"].getToken();

          if (!token) {
            _context5.next = 11;
            break;
          }

          user = jwt_decode__WEBPACK_IMPORTED_MODULE_2___default()(token);
          currentTime = Date.now() / 1000;

          if (!(user.exp < currentTime)) {
            _context5.next = 8;
            break;
          }

          _context5.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["refreshLoginFailure"]());

        case 7:
          return _context5.abrupt("return");

        case 8:
          _context5.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["refreshLoginSuccess"](user));

        case 10:
          return _context5.abrupt("return");

        case 11:
          _context5.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_auth__WEBPACK_IMPORTED_MODULE_5__["refreshLoginFailure"]());

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_4__["auth"].LOGIN_REQUEST, login);

        case 2:
          _context6.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_4__["auth"].REGISTER_REQUEST, register);

        case 4:
          _context6.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_4__["auth"].SOCIAL_LOGIN_REQUEST, socialLogin);

        case 6:
          _context6.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_4__["auth"].REFRESH_LOGIN_REQUEST, refreshLogin);

        case 8:
          _context6.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_4__["auth"].LOGOUT_REQUEST, logout);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

/***/ }),

/***/ "./src/sagas/index.js":
/*!****************************!*\
  !*** ./src/sagas/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _callee; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth */ "./src/sagas/auth.js");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile */ "./src/sagas/profile.js");


var _marked =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(_callee);




function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["fork"])(_auth__WEBPACK_IMPORTED_MODULE_2__["default"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["fork"])(_profile__WEBPACK_IMPORTED_MODULE_3__["default"])]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

/***/ }),

/***/ "./src/sagas/profile.js":
/*!******************************!*\
  !*** ./src/sagas/profile.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _callee; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/types */ "./src/actions/types.js");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/profile */ "./src/actions/profile.js");
/* harmony import */ var _services_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/profile */ "./src/services/profile.js");


var _marked =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getProfile),
    _marked2 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(updateProfile),
    _marked3 =
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(_callee);






function getProfile() {
  var response;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_services_profile__WEBPACK_IMPORTED_MODULE_4__["getProfileRequest"]);

        case 3:
          response = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_profile__WEBPACK_IMPORTED_MODULE_3__["getProfileSuccess"](response));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_profile__WEBPACK_IMPORTED_MODULE_3__["getProfileFailure"]());

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function updateProfile(_ref) {
  var payload, response;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function updateProfile$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = _ref.payload;
          _context2.prev = 1;
          _context2.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_services_profile__WEBPACK_IMPORTED_MODULE_4__["updateProfileRequest"], payload);

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_profile__WEBPACK_IMPORTED_MODULE_3__["updateProfileSuccess"](response));

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(_actions_profile__WEBPACK_IMPORTED_MODULE_3__["updateProfileFailure"]());

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 9]]);
}

function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_2__["profile"].GET_PROFILE_REQUEST, getProfile);

        case 2:
          _context3.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_actions_types__WEBPACK_IMPORTED_MODULE_2__["profile"].UPDATE_PROFILE_REQUEST, updateProfile);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

/***/ }),

/***/ "./src/scss/base.scss":
/*!****************************!*\
  !*** ./src/scss/base.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./base.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./base.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./base.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/scss/common/helpPage.scss":
/*!***************************************!*\
  !*** ./src/scss/common/helpPage.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./helpPage.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/common/helpPage.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./helpPage.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/common/helpPage.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./helpPage.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/common/helpPage.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/services/auth.js":
/*!******************************!*\
  !*** ./src/services/auth.js ***!
  \******************************/
/*! exports provided: socialLoginRequest, registerRequest, loginRequest, logOutRequest, changePassword, forgotPasswordRequest, resetPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "socialLoginRequest", function() { return socialLoginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerRequest", function() { return registerRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRequest", function() { return loginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOutRequest", function() { return logOutRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePassword", function() { return changePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forgotPasswordRequest", function() { return forgotPasswordRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPassword", function() { return resetPassword; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _httpService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./httpService */ "./src/services/httpService.js");
/* harmony import */ var _storageService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storageService */ "./src/services/storageService.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
var socialLoginRequest = function socialLoginRequest(res) {
  var decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_3___default()(res.payload);
  _storageService__WEBPACK_IMPORTED_MODULE_5__["storageWrapper"].setToken(res.payload);
  return decoded;
};
var registerRequest =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(data) {
    var _ref2, token, decoded;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _httpService__WEBPACK_IMPORTED_MODULE_4__["httpService"].post({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_6__["links"].registrationRoute,
              data: data,
              config: config
            });

          case 3:
            _ref2 = _context.sent;
            token = _ref2.data.token;
            decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_3___default()(token);
            _storageService__WEBPACK_IMPORTED_MODULE_5__["storageWrapper"].setToken(token);
            return _context.abrupt("return", decoded);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw _context.t0.response.data;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function registerRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();
var loginRequest =
/*#__PURE__*/
function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(data) {
    var _ref4, token, decoded;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _httpService__WEBPACK_IMPORTED_MODULE_4__["httpService"].post({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_6__["links"].loginRoute,
              data: data,
              config: config
            });

          case 3:
            _ref4 = _context2.sent;
            token = _ref4.data.token;
            decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_3___default()(token);
            _storageService__WEBPACK_IMPORTED_MODULE_5__["storageWrapper"].setToken(token);
            return _context2.abrupt("return", decoded);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0.response.data;

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function loginRequest(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
var logOutRequest = function logOutRequest() {
  _storageService__WEBPACK_IMPORTED_MODULE_5__["storageWrapper"].deleteToken();
};
var changePassword =
/*#__PURE__*/
function () {
  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(data) {
    var res;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            config.headers.Authorization = localStorage.token;
            _context3.next = 3;
            return _httpService__WEBPACK_IMPORTED_MODULE_4__["httpService"].put({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_6__["links"].changePasswordRoute,
              data: data,
              config: config
            });

          case 3:
            res = _context3.sent;
            return _context3.abrupt("return", res);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function changePassword(_x3) {
    return _ref5.apply(this, arguments);
  };
}();
var forgotPasswordRequest =
/*#__PURE__*/
function () {
  var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(data) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _httpService__WEBPACK_IMPORTED_MODULE_4__["httpService"].post({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_6__["links"].resetRoute,
              data: data,
              config: {
                validateStatus: function validateStatus(status) {
                  return status >= 200 && status < 500;
                }
              }
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response.data);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function forgotPasswordRequest(_x4) {
    return _ref6.apply(this, arguments);
  };
}();
var resetPassword =
/*#__PURE__*/
function () {
  var _ref8 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(_ref7) {
    var token, password, confirmPassword, response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = _ref7.token, password = _ref7.password, confirmPassword = _ref7.confirmPassword;
            _context5.next = 3;
            return _httpService__WEBPACK_IMPORTED_MODULE_4__["httpService"].post({
              url: "users/reset-password",
              data: {
                password: password,
                confirmPassword: confirmPassword
              },
              config: _objectSpread({}, config, {
                headers: _objectSpread({}, config.headers, {
                  authorization: token
                }),
                validateStatus: function validateStatus(status) {
                  return status >= 200 && status < 500;
                }
              })
            });

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response.data);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function resetPassword(_x5) {
    return _ref8.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/services/httpService.js":
/*!*************************************!*\
  !*** ./src/services/httpService.js ***!
  \*************************************/
/*! exports provided: httpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "httpService", function() { return httpService; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var HttpService = function HttpService(baseUrl) {
  var _this = this;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, HttpService);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "get",
  /*#__PURE__*/
  function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
      var url, id, _ref$params, params, _ref$config, config, path, response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = _ref.url, id = _ref.id, _ref$params = _ref.params, params = _ref$params === void 0 ? {} : _ref$params, _ref$config = _ref.config, config = _ref$config === void 0 ? {} : _ref$config;
              path = id ? "".concat(_this.baseUrl + url, "/").concat(id) : "".concat(_this.baseUrl + url);
              _context.next = 4;
              return _this.service.request(_objectSpread({
                method: 'get',
                url: path,
                params: params
              }, config));

            case 4:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "post",
  /*#__PURE__*/
  function () {
    var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(_ref3) {
      var url, data, _ref3$config, config, path, response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = _ref3.url, data = _ref3.data, _ref3$config = _ref3.config, config = _ref3$config === void 0 ? {} : _ref3$config;
              path = _this.baseUrl + url;
              _context2.next = 4;
              return _this.service.request(_objectSpread({
                method: 'post',
                url: path,
                data: data
              }, config));

            case 4:
              response = _context2.sent;
              return _context2.abrupt("return", response);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "put",
  /*#__PURE__*/
  function () {
    var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(_ref5) {
      var url, id, data, _ref5$config, config, path, response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = _ref5.url, id = _ref5.id, data = _ref5.data, _ref5$config = _ref5.config, config = _ref5$config === void 0 ? {} : _ref5$config;
              path = id ? "".concat(_this.baseUrl + url, "/").concat(id) : "".concat(_this.baseUrl + url);
              _context3.next = 4;
              return _this.service.request(_objectSpread({
                method: 'put',
                url: path,
                data: data
              }, config));

            case 4:
              response = _context3.sent;
              return _context3.abrupt("return", response);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref6.apply(this, arguments);
    };
  }());

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "delete",
  /*#__PURE__*/
  function () {
    var _ref8 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(_ref7) {
      var url, id, _ref7$config, config, path, response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = _ref7.url, id = _ref7.id, _ref7$config = _ref7.config, config = _ref7$config === void 0 ? {} : _ref7$config;
              path = id ? "".concat(_this.baseUrl + url, "/").concat(id) : "".concat(_this.baseUrl + url);
              _context4.next = 4;
              return _this.service.request(_objectSpread({
                method: 'delete',
                url: path
              }, config));

            case 4:
              response = _context4.sent;
              return _context4.abrupt("return", response);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref8.apply(this, arguments);
    };
  }());

  this.baseUrl = baseUrl;
  this.baseConfig = {
    responseType: 'json'
  };
  this.service = axios__WEBPACK_IMPORTED_MODULE_4___default.a.create(_objectSpread({}, this.baseConfig));
};

var httpService = new HttpService('api/');

/***/ }),

/***/ "./src/services/profile.js":
/*!*********************************!*\
  !*** ./src/services/profile.js ***!
  \*********************************/
/*! exports provided: getProfileRequest, updateProfileRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfileRequest", function() { return getProfileRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProfileRequest", function() { return updateProfileRequest; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _httpService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./httpService */ "./src/services/httpService.js");
/* harmony import */ var _storageService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storageService */ "./src/services/storageService.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");





var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
var getProfileRequest =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var _ref2, data;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config.headers.Authorization = _storageService__WEBPACK_IMPORTED_MODULE_3__["storageWrapper"].getToken();
            _context.next = 3;
            return _httpService__WEBPACK_IMPORTED_MODULE_2__["httpService"].get({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["links"].publicProfileRoute,
              config: config
            });

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;
            return _context.abrupt("return", data);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProfileRequest() {
    return _ref.apply(this, arguments);
  };
}();
var updateProfileRequest =
/*#__PURE__*/
function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(data) {
    var _ref4, profile;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _httpService__WEBPACK_IMPORTED_MODULE_2__["httpService"].put({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["links"].publicProfileRoute,
              data: data,
              config: config
            });

          case 2:
            _ref4 = _context2.sent;
            profile = _ref4.data;
            return _context2.abrupt("return", profile);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateProfileRequest(_x) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/services/storageService.js":
/*!****************************************!*\
  !*** ./src/services/storageService.js ***!
  \****************************************/
/*! exports provided: storageWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storageWrapper", function() { return storageWrapper; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);



var LocalStorageWrapper = function LocalStorageWrapper() {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LocalStorageWrapper);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "getToken", function () {
    return localStorage.getItem('token');
  });

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "setToken", function (token) {
    localStorage.setItem('token', token);
  });

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "deleteToken", function () {
    localStorage.removeItem('token');
  });
};

var storageWrapper = new LocalStorageWrapper();

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: configureStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configureStore", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/index */ "./src/reducers/index.js");
/* harmony import */ var _sagas_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sagas/index */ "./src/sagas/index.js");




var configureStore = function configureStore() {
  var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux__WEBPACK_IMPORTED_MODULE_0__["compose"];
  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_2__["default"], composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(sagaMiddleware)));
  sagaMiddleware.run(_sagas_index__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return store;
};

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: links */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "links", function() { return links; });
var links = {
  iTechVK: 'https://vk.com/itechart.group',
  iTechYoutube: 'https://www.youtube.com/user/iTechArt',
  iTechFacebook: 'https://www.facebook.com/iTechArt.Group',
  linkedInURL: 'api/users/auth/linkedin',
  googleURL: 'api/users/auth/google',
  resetRoute: 'users/forgot-password',
  changePasswordRoute: 'users/change-password',
  loginRoute: 'users/login',
  registrationRoute: 'users/registration',
  publicProfileRoute: 'profile/public',
  twitter: 'http://twitter.com/',
  facebook: 'https://www.facebook.com/',
  linkedIn: 'https://www.linkedin.com/'
};

/***/ }),

/***/ "./src/utils/validToken.js":
/*!*********************************!*\
  !*** ./src/utils/validToken.js ***!
  \*********************************/
/*! exports provided: isTokenValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTokenValid", function() { return isTokenValid; });
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ "./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_0__);

var isTokenValid = function isTokenValid() {
  if (localStorage.token) {
    var user = jwt_decode__WEBPACK_IMPORTED_MODULE_0___default()(localStorage.token);
    var currentTime = Date.now() / 1000;
    return user.exp > currentTime;
  }

  return false;
};

/***/ }),

/***/ "./src/validation/auth.js":
/*!********************************!*\
  !*** ./src/validation/auth.js ***!
  \********************************/
/*! exports provided: firstNameSchema, lastNameSchema, loginValidate, registerValidate, changePasswordValidate, emailValidate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstNameSchema", function() { return firstNameSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastNameSchema", function() { return lastNameSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginValidate", function() { return loginValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerValidate", function() { return registerValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePasswordValidate", function() { return changePasswordValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailValidate", function() { return emailValidate; });
/* harmony import */ var joi_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi-browser */ "./node_modules/joi-browser/dist/joi-browser.js");
/* harmony import */ var joi_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi_browser__WEBPACK_IMPORTED_MODULE_0__);

var firstNameSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(20).required();
var lastNameSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().min(2).max(20);
var emailSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().email().max(64);
var passwordSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().regex(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/).min(8).max(32);
var passwordConfirmSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  password: joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().regex(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/).min(8).max(32),
  confirmPassword: joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.any().valid(joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.ref('password')).required().options({
    language: {
      any: {
        allowOnly: '!!Passwords do not match'
      }
    }
  })
});
var loginValidate = function loginValidate(email, password) {
  var errors = {};
  var emailValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(email, emailSchema);
  var passwordValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(password, passwordSchema);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace('"value"', 'Email');
  }

  if (passwordValidate.error) {
    errors.password = passwordValidate.error.details[0].message.replace('"value"', 'Password');

    if (errors.password.includes('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')) {
      errors.password = 'Password must contain at least one uppercase letter and one special symbol';
    }
  }

  return errors;
};
var registerValidate = function registerValidate(firstName, lastName, email, password, confirmPassword) {
  var errors = {};
  var firstNameValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(firstName, firstNameSchema);
  var lastNameValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(lastName, lastNameSchema);
  var emailValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(email, emailSchema);
  var passwordValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate({
    password: password,
    confirmPassword: confirmPassword
  }, passwordConfirmSchema);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace('"value"', 'Email');
  }

  if (passwordValidate.error) {
    errors.password = passwordValidate.error.details[0].message.replace('"password"', 'Password');

    if (errors.password.includes('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')) {
      errors.password = 'Password must contain at least one uppercase letter and one special symbol';
    }
  }

  if (firstNameValidate.error) {
    errors.firstName = firstNameValidate.error.details[0].message.replace('"value"', 'First name');
  }

  if (lastNameValidate.error) {
    errors.lastName = lastNameValidate.error.details[0].message.replace('"value"', 'Last name');
  }

  return errors;
};
var changePasswordValidate = function changePasswordValidate(password, confirmPassword) {
  var errors = {};
  var passwordValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate({
    password: password,
    confirmPassword: confirmPassword
  }, passwordConfirmSchema);

  if (passwordValidate.error) {
    errors.password = passwordValidate.error.details[0].message.replace('"password"', 'Password');

    if (errors.password.includes('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}')) {
      errors.password = 'Password must contain at least one uppercase letter and one special symbol';
    }
  }

  return errors;
};
var emailValidate = function emailValidate(email) {
  var errors = {};
  var emailValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(email, emailSchema);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace('"email"', 'Email');
  }

  return errors;
};

/***/ }),

/***/ "./src/validation/profile.js":
/*!***********************************!*\
  !*** ./src/validation/profile.js ***!
  \***********************************/
/*! exports provided: publicProfileValidate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publicProfileValidate", function() { return publicProfileValidate; });
/* harmony import */ var joi_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi-browser */ "./node_modules/joi-browser/dist/joi-browser.js");
/* harmony import */ var joi_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi_browser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "./src/validation/auth.js");


var descriptionSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().max(255);
var socialSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().uri().allow('').optional();
var publicProfileValidate = function publicProfileValidate(profile) {
  var errors = {};
  var firstName = profile.firstName,
      lastName = profile.lastName,
      description = profile.description,
      twitterLink = profile.twitterLink,
      facebookLink = profile.facebookLink,
      linkedInLink = profile.linkedInLink;
  var firstNameValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(firstName, _auth__WEBPACK_IMPORTED_MODULE_1__["firstNameSchema"]);
  var lastNameValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(lastName, _auth__WEBPACK_IMPORTED_MODULE_1__["lastNameSchema"]);
  var descriptionValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(description, descriptionSchema);
  var twitterLinkValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(twitterLink, socialSchema);
  var facebookLinkValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(facebookLink, socialSchema);
  var linkedInLinkValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(linkedInLink, socialSchema);

  if (firstNameValidate.error) {
    errors.firstName = firstNameValidate.error.details[0].message.replace('"value"', 'First name');
  }

  if (lastNameValidate.error) {
    errors.lastName = lastNameValidate.error.details[0].message.replace('"value"', 'Last name');
  }

  if (descriptionValidate.error) {
    errors.description = descriptionValidate.error.details[0].message.replace('"value"', 'Description');
  }

  if (twitterLinkValidate.error) {
    errors.twitterLink = twitterLinkValidate.error.details[0].message.replace('"value"', 'Twitter link');
  }

  if (facebookLinkValidate.error) {
    errors.facebookLink = facebookLinkValidate.error.details[0].message.replace('"value"', 'Facebook link');
  }

  if (linkedInLinkValidate.error) {
    errors.linkedInLink = linkedInLinkValidate.error.details[0].message.replace('"value"', 'Linkedin link');
  }

  return errors;
};

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi @babel/polyfill ./src/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"./node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! /home/viachaslau/Project-X/project-x-client/src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map