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
/******/ 	var hotCurrentHash = "4caa2f26996e7cc01ba2";
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

/***/ "./i18n.js":
/*!*****************!*\
  !*** ./i18n.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ "./node_modules/i18next/dist/esm/i18next.js");
/* harmony import */ var i18next_browser_languagedetector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next-browser-languagedetector */ "./node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js");
/* harmony import */ var i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next-xhr-backend */ "./node_modules/i18next-xhr-backend/dist/esm/i18nextXHRBackend.js");
/* harmony import */ var _locales_en_translation_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./locales/en/translation.json */ "./locales/en/translation.json");
var _locales_en_translation_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/en/translation.json */ "./locales/en/translation.json", 1);
/* harmony import */ var _locales_ru_translation_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./locales/ru/translation.json */ "./locales/ru/translation.json");
var _locales_ru_translation_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/ru/translation.json */ "./locales/ru/translation.json", 1);





i18next__WEBPACK_IMPORTED_MODULE_0__["default"].use(i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_2__["default"]).use(i18next_browser_languagedetector__WEBPACK_IMPORTED_MODULE_1__["default"]).init({
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translations: _locales_en_translation_json__WEBPACK_IMPORTED_MODULE_3__
    },
    ru: {
      translations: _locales_ru_translation_json__WEBPACK_IMPORTED_MODULE_4__
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});
/* harmony default export */ __webpack_exports__["default"] = (i18next__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./locales/en/translation.json":
/*!*************************************!*\
  !*** ./locales/en/translation.json ***!
  \*************************************/
/*! exports provided: Catalogue, search, Log In, Register, Account, Log out, Log In to your Das Pish account, Password, Confirm Password, Forgot Password?, Create account and be a DasPish member!, Username, Create account, Already have an account?, Enter E-mail, Send, Learn ! Potom DasPish !, We are learning the whole world ! If don't believe us you don't believe nobody., Lorem ipsum dolor sit amet consectetur adipisicing., Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nobis similique delectus? Dolor, ut aliquid.., Lorem, ipsum dolor., Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, incidunt eum sint maiores necessitatibus dolores laudantium quasi quas minus amet., Getting Started, Learn how our courses works and how to start learning, Troubleshooting, Experiencing a bug? Check here, Course Taking, Everything about taking our course, Copyright (c) DasPish Corporate, Terms, Privacy Policy and Cookie Policy, Description, John Doe, student, Profile, Courses, Settings, Update, Save, Close, Public, Email is not allowed to be empty, Password is not allowed to be empty, Email must be a valid email, Password must contain at least one uppercase letter and one special symbol, Email length must be less than or equal to 64 characters long, Password length must be less than or equal to 32 characters long, Password length must be at least 8 characters long, Wrong password, User not found, Please enter course name, description or author, Username is not allowed to be empty, Passwords do not match, For free, Teacher request, Checkbox 1, Checkbox 2, Add payment data, Update password, Continue, Students, Author, Language, Your profits, Reviews, Show more reviews, There are no courses with, value, Push, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Catalogue\":\"Catalogue\",\"search\":\"search\",\"Log In\":\"Log In\",\"Register\":\"Register\",\"Account\":\"Account\",\"Log out\":\"Log out\",\"Log In to your Das Pish account\":\"Log In to your Das Pish account\",\"Password\":\"Password\",\"Confirm Password\":\"Confirm Password\",\"Forgot Password?\":\"Forgot Password?\",\"Create account and be a DasPish member!\":\"Create account and be a DasPish member!\",\"Username\":\"Username\",\"Create account\":\"Create account\",\"Already have an account?\":\"Already have an account?\",\"Enter E-mail\":\"Enter E-mail\",\"Send\":\"Send\",\"Learn ! Potom DasPish !\":\"Learn ! Potom DasPish !\",\"We are learning the whole world ! If don't believe us you don't believe nobody.\":\"We are learning the whole world ! If don't believe us you don't believe nobody.\",\"Lorem ipsum dolor sit amet consectetur adipisicing.\":\"Lorem ipsum dolor sit amet consectetur adipisicing.\",\"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nobis similique delectus? Dolor, ut aliquid..\":\"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nobis similique delectus? Dolor, ut aliquid..\",\"Lorem, ipsum dolor.\":\"Lorem, ipsum dolor.\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, incidunt eum sint maiores necessitatibus dolores laudantium quasi quas minus amet.\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, incidunt eum sint maiores necessitatibus dolores laudantium quasi quas minus amet.\",\"Getting Started\":\"Getting Started\",\"Learn how our courses works and how to start learning\":\"Learn how our courses works and how to start learning\",\"Troubleshooting\":\"Troubleshooting\",\"Experiencing a bug? Check here\":\"Experiencing a bug? Check here\",\"Course Taking\":\"Course Taking\",\"Everything about taking our course\":\"Everything about taking our course\",\"Copyright (c) DasPish Corporate\":\"Copyright (c) DasPish Corporate\",\"Terms\":\"Terms\",\"Privacy Policy and Cookie Policy\":\"Privacy Policy and Cookie Policy\",\"Description\":\"Description\",\"John Doe\":\"John Doe\",\"student\":\"student\",\"Profile\":\"Profile\",\"Courses\":\"Courses\",\"Settings\":\"Settings\",\"Update\":\"Update\",\"Save\":\"Save\",\"Close\":\"Close\",\"Public\":\"Public\",\"Email is not allowed to be empty\":\"Email is not allowed to be empty\",\"Password is not allowed to be empty\":\"Password is not allowed to be empty\",\"Email must be a valid email\":\"Email must be a valid email\",\"Password must contain at least one uppercase letter and one special symbol\":\"Password must contain at least one uppercase letter and one special symbol\",\"Email length must be less than or equal to 64 characters long\":\"Email length must be less than or equal to 64 characters long\",\"Password length must be less than or equal to 32 characters long\":\"Password length must be less than or equal to 32 characters long\",\"Password length must be at least 8 characters long\":\"Password length must be at least 8 characters long\",\"Wrong password\":\"Wrong password\",\"User not found\":\"User not found\",\"Please enter course name, description or author\":\"Please enter course name, description or author\",\"Username is not allowed to be empty\":\"Username is not allowed to be empty\",\"Passwords do not match\":\"Passwords do not match\",\"For free\":\"For free\",\"Teacher request\":\"Teacher request\",\"Checkbox 1\":\"Checkbox 1\",\"Checkbox 2\":\"Checkbox 2\",\"Add payment data\":\"Add payment data\",\"Update password\":\"Update password\",\"Continue\":\"Continue\",\"Students\":\"Students\",\"Author\":\"Author\",\"Language\":\"Language\",\"Your profits\":\"Your profits\",\"Reviews\":\"Reviews\",\"Show more reviews\":\"Show more reviews\",\"There are no courses with\":\"There are no courses with\",\"value\":\"value\",\"Push\":\"Push\"}");

/***/ }),

/***/ "./locales/ru/translation.json":
/*!*************************************!*\
  !*** ./locales/ru/translation.json ***!
  \*************************************/
/*! exports provided: Catalogue, search, Log In, Register, Account, Log out, Log In to your Das Pish account, Password, Confirm Password, Forgot Password?, Create account and be a DasPish member!, Username, Create account, Already have an account?, Enter E-mail, Send, Learn ! Potom DasPish !, We are learning the whole world ! If don't believe us you don't believe nobody., Lorem ipsum dolor sit amet consectetur adipisicing., Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nobis similique delectus? Dolor, ut aliquid.., Lorem, ipsum dolor., Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, incidunt eum sint maiores necessitatibus dolores laudantium quasi quas minus amet., Getting Started, Learn how our courses works and how to start learning, Troubleshooting, Experiencing a bug? Check here, Course Taking, Everything about taking our course, Copyright (c) DasPish Corporate, Terms, Privacy Policy and Cookie Policy, Description, John Doe, student, Profile, Courses, Settings, Update, Save, Close, Public, Email is not allowed to be empty, Password is not allowed to be empty, Email must be a valid email, Password must contain at least one uppercase letter and one special symbol, Email length must be less than or equal to 64 characters long, Password length must be less than or equal to 32 characters long, Password length must be at least 8 characters long, Wrong password, User not found, Please enter course name, description or author, Username is not allowed to be empty, Passwords do not match, For free, Teacher request, Checkbox 1, Checkbox 2, Add payment data, Update password, Continue, Students, Author, Language, Your profits, Reviews, Show more reviews, There are no courses with, value, Push, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Catalogue\":\"Каталог\",\"search\":\"поиск\",\"Log In\":\"Войти\",\"Register\":\"Регистрация\",\"Account\":\"Личный кабинет\",\"Log out\":\"Выйти\",\"Log In to your Das Pish account\":\"Войдите в ваш Das Pish аккаунт\",\"Password\":\"Пароль\",\"Confirm Password\":\"Подтвердите пароль\",\"Forgot Password?\":\"Забыли пароль?\",\"Create account and be a DasPish member!\":\"Регистрация\",\"Username\":\"Имя пользователя\",\"Create account\":\"Зарегистрироваться\",\"Already have an account?\":\"Уже есть аккаунт?\",\"Enter E-mail\":\"Введите E-mail\",\"Send\":\"Отправить\",\"Learn ! Potom DasPish !\":\"Учиться ! Потом DasPish!\",\"We are learning the whole world ! If don't believe us you don't believe nobody.\":\"Мы учим весь мир! Если не веришь нам, ты не веришь никому.\",\"Lorem ipsum dolor sit amet consectetur adipisicing.\":\"Значимость этих проблем настолько очевидна.\",\"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nobis similique delectus? Dolor, ut aliquid..\":\"Практический опыт показывает, что выбранный нами инновационный путь требует от нас анализа ключевых компонентов..\",\"Lorem, ipsum dolor.\":\"С другой стороны повышение уровня.\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, incidunt eum sint maiores necessitatibus dolores laudantium quasi quas minus amet.\":\"Задача организации, в особенности же постоянный количественный рост и сфера нашей активности позволяет выполнить важнейшие задания по разработке позиций.\",\"Getting Started\":\"Руководство по началу работы\",\"Learn how our courses works and how to start learning\":\"Узнайте, как работают наши курсы и как начать обучение\",\"Troubleshooting\":\"Поиск неисправностей\",\"Experiencing a bug? Check here\":\"Произошла ошибка? Проверьте здесь\",\"Course Taking\":\"Курс\",\"Everything about taking our course\":\"Все о нашем курсе\",\"Copyright (c) DasPish Corporate\":\"Авторские права (c) DasPish Corporate\",\"Terms\":\"Правила использования\",\"Privacy Policy and Cookie Policy\":\"Политика конфиденциальности\",\"Description\":\"Описание\",\"John Doe\":\"Иван Иванов\",\"student\":\"студент\",\"Profile\":\"Профиль\",\"Courses\":\"Курсы\",\"Settings\":\"Настройки\",\"Update\":\"Обновить\",\"Save\":\"Сохранить\",\"Close\":\"Закрыть\",\"Public\":\"Общее\",\"Email is not allowed to be empty\":\"Введите имя почты\",\"Password is not allowed to be empty\":\"Введите пароль\",\"Email must be a valid email\":\"Неверный формат электронной почты\",\"Password must contain at least one uppercase letter and one special symbol\":\"Пароль должен содержать как минимум одну заглавную букву и один специальный символ\",\"Email length must be less than or equal to 64 characters long\":\"Длина электронной почты должна быть не более 64 символов\",\"Password length must be less than or equal to 32 characters long\":\"Длина пароля должна быть не более 32 символов\",\"Password length must be at least 8 characters long\":\"Длина пароля должна быть не менее 8 символов\",\"Wrong password\":\"Неверный пароль\",\"User not found\":\"Такого пользователя не существует\",\"Please enter course name, description or author\":\"Пожалуйста, введите название курса, описание или автора\",\"Username is not allowed to be empty\":\"Введите имя пользователя\",\"Passwords do not match\":\"Пароли не совпадают\",\"For free\":\"Бесплатно\",\"Teacher request\":\"Стать учителем\",\"Checkbox 1\":\"Выбор 1\",\"Checkbox 2\":\"Выбор 2\",\"Add payment data\":\"Добавить способ оплаты\",\"Update password\":\"Обновить пароль\",\"Continue\":\"Продолжить\",\"Students\":\"Студенты\",\"Author\":\"Автор\",\"Language\":\"Язык\",\"Your profits\":\"Вы научитесь\",\"Reviews\":\"Отзывы\",\"Show more reviews\":\"Показать больше отзывов\",\"There are no courses with\":\"Не найдено курсов с\",\"value\":\"значением\",\"Push\":\"Отправить\"}");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/header/menu.scss ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".mobileMenuActive {\n  display: flex !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/dotsStyles.scss":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/dotsStyles.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".mainPageSlider .alice-carousel__dots-item {\n  height: 20px;\n  width: 20px;\n  border-radius: 4px;\n  background: #515151;\n  opacity: 0.8; }\n  .mainPageSlider .alice-carousel__dots-item:hover {\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n\n.mainPageSlider .alice-carousel__dots-item.__active {\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/scss/base.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "#root {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  font-family: Roboto, sans-serif; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  color: #fff; }\n\n.hidden_text {\n  display: none; }\n\n.toastifyMessage {\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n  border-radius: 8px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/courseCard/style.module.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/courseCard/style.module.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".style-module__courseCardWrapper_2-Lwb {\n  text-decoration: unset; }\n\n.style-module__courseCard_StueI {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: #262626;\n  padding: 15px;\n  box-sizing: border-box;\n  border-radius: 8px;\n  color: #fff;\n  font-family: Roboto, sans-serif;\n  font-size: 0.6em;\n  max-width: 260px;\n  max-height: 400px;\n  border: 1px solid #515151;\n  margin: 30px; }\n  .style-module__courseCard_StueI:hover {\n    box-shadow: 0px 0px 10px 5px #515151;\n    cursor: pointer; }\n  .style-module__courseCard_StueI .style-module__courseCardPreview_1mwtd {\n    object-fit: cover;\n    object-position: center;\n    border-radius: 2px;\n    max-width: 260px;\n    width: 100%; }\n  .style-module__courseCard_StueI .style-module__courseCardDescription_F4brE {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-evenly;\n    width: 100%; }\n    .style-module__courseCard_StueI .style-module__courseCardDescription_F4brE .style-module__courseCardTitle_2V9lH {\n      text-overflow: ellipsis;\n      width: 100%;\n      font-size: 18px;\n      overflow: hidden;\n      white-space: nowrap;\n      text-align: center;\n      margin-top: 10px;\n      margin-bottom: 5px; }\n    .style-module__courseCard_StueI .style-module__courseCardDescription_F4brE .style-module__courseCardPrice_3ydJx {\n      align-self: flex-end;\n      margin: 5px;\n      font-size: 1.2em; }\n    .style-module__courseCard_StueI .style-module__courseCardDescription_F4brE .style-module__courseCardAuthor_gCXtX {\n      font-size: 14px;\n      margin: 5px; }\n    .style-module__courseCard_StueI .style-module__courseCardDescription_F4brE .style-module__courseCardRate_wNxz3 {\n      margin: 5px;\n      font-size: 14px; }\n", ""]);
// Exports
exports.locals = {
	"courseCardWrapper": "style-module__courseCardWrapper_2-Lwb",
	"courseCard": "style-module__courseCard_StueI",
	"courseCardPreview": "style-module__courseCardPreview_1mwtd",
	"courseCardDescription": "style-module__courseCardDescription_F4brE",
	"courseCardTitle": "style-module__courseCardTitle_2V9lH",
	"courseCardPrice": "style-module__courseCardPrice_3ydJx",
	"courseCardAuthor": "style-module__courseCardAuthor_gCXtX",
	"courseCardRate": "style-module__courseCardRate_wNxz3"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/coursesCarousel/styles.module.scss":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/coursesCarousel/styles.module.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__carouselContainer_3p9xq {\n  height: 400px;\n  background-color: #262626;\n  margin: 15px 0;\n  width: 75%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between; }\n  .styles-module__carouselContainer_3p9xq .styles-module__carouselArrows_2L_4E {\n    max-width: 50px;\n    max-height: 50px;\n    width: 100%;\n    height: 100%; }\n  .styles-module__carouselContainer_3p9xq .styles-module__navButton_3c5UV {\n    width: 5%;\n    background: Transparent no-repeat;\n    border: none;\n    cursor: pointer;\n    overflow: hidden;\n    outline: none;\n    height: 100%; }\n    @media screen and (max-width: 768px) {\n      .styles-module__carouselContainer_3p9xq .styles-module__navButton_3c5UV {\n        display: none; } }\n    .styles-module__carouselContainer_3p9xq .styles-module__navButton_3c5UV .styles-module__disabled_1r-75 {\n      opacity: 0.3; }\n  .styles-module__carouselContainer_3p9xq .styles-module__carousel_1m2Ea {\n    width: 90%; }\n    @media screen and (max-width: 768px) {\n      .styles-module__carouselContainer_3p9xq .styles-module__carousel_1m2Ea {\n        width: 100%; } }\n  .styles-module__carouselContainer_3p9xq .styles-module__courseCardContainer_3eauN {\n    height: 320px;\n    width: 300px;\n    position: relative;\n    left: 50%;\n    margin-left: -150px; }\n    @media screen and (max-width: 350px) {\n      .styles-module__carouselContainer_3p9xq .styles-module__courseCardContainer_3eauN {\n        left: 50%;\n        margin-left: -150px; } }\n", ""]);
// Exports
exports.locals = {
	"carouselContainer": "styles-module__carouselContainer_3p9xq",
	"carouselArrows": "styles-module__carouselArrows_2L_4E",
	"navButton": "styles-module__navButton_3c5UV",
	"disabled": "styles-module__disabled_1r-75",
	"carousel": "styles-module__carousel_1m2Ea",
	"courseCardContainer": "styles-module__courseCardContainer_3eauN"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/errorBoundary/styles.module.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/errorBoundary/styles.module.scss ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__errorWrapper_2kYCl {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh; }\n", ""]);
// Exports
exports.locals = {
	"errorWrapper": "styles-module__errorWrapper_2kYCl"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/footer/styles.module.scss ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__footer_2j8xa {\n  margin: 15px 0;\n  width: 75%;\n  background-color: #262626;\n  display: flex;\n  justify-content: space-between;\n  padding: 20px 0; }\n  @media (max-width: 768px) {\n    .styles-module__footer_2j8xa {\n      flex-direction: column; } }\n  .styles-module__footer_2j8xa .styles-module__logoWrapper_3zO-7 {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: #fff;\n    margin: 0 20px;\n    text-align: center; }\n    .styles-module__footer_2j8xa .styles-module__logoWrapper_3zO-7 span {\n      margin-right: 10px;\n      font-size: 18px;\n      transform: rotate(-20deg);\n      text-decoration: underline; }\n  .styles-module__footer_2j8xa .styles-module__termsWrapper_36J1V {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 14px; }\n    .styles-module__footer_2j8xa .styles-module__termsWrapper_36J1V a {\n      color: #fff;\n      margin: 0 20px; }\n", ""]);
// Exports
exports.locals = {
	"footer": "styles-module__footer_2j8xa",
	"logoWrapper": "styles-module__logoWrapper_3zO-7",
	"termsWrapper": "styles-module__termsWrapper_36J1V"
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
exports.push([module.i, ".styles-module__modal_fB3Xv {\n  font-family: Roboto, sans-serif;\n  background-color: #212121;\n  width: 500px;\n  border-radius: 6px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin: auto;\n  transform: translate(-50%, -50%); }\n  .styles-module__modal_fB3Xv:focus {\n    outline: 0; }\n  .styles-module__modal_fB3Xv .styles-module__closeModal_2Aqtk {\n    color: #fff;\n    position: absolute;\n    right: 15px;\n    top: 15px;\n    padding: 0;\n    background: none;\n    border: none;\n    font: inherit;\n    cursor: pointer;\n    outline: none; }\n  @media screen and (max-width: 576px) {\n    .styles-module__modal_fB3Xv {\n      width: 90%; } }\n", ""]);
// Exports
exports.locals = {
	"modal": "styles-module__modal_fB3Xv",
	"closeModal": "styles-module__closeModal_2Aqtk"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/privacy/styles.module.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/privacy/styles.module.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__privacyWrapper_3ge97 {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 75%;\n  min-height: 100vh;\n  background-color: #262626; }\n  .styles-module__privacyWrapper_3ge97 p {\n    color: #fff;\n    margin: 10px 30px; }\n", ""]);
// Exports
exports.locals = {
	"privacyWrapper": "styles-module__privacyWrapper_3ge97"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/search/styles.module.scss":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/search/styles.module.scss ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__search_2VWtO {\n  display: flex;\n  align-items: flex-start;\n  position: relative;\n  flex: 1 1 auto;\n  cursor: pointer; }\n  .styles-module__search_2VWtO:hover {\n    color: #ff8c05; }\n  @media (max-width: 576px) {\n    .styles-module__search_2VWtO {\n      padding: 0 0 0 20px; } }\n  .styles-module__search_2VWtO input {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 14px;\n    transition: border-bottom 0.3s;\n    line-height: 1.5;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    padding: 0;\n    width: 90%;\n    margin: 0; }\n    .styles-module__search_2VWtO input:hover, .styles-module__search_2VWtO input:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__search_2VWtO input:-webkit-autofill, .styles-module__search_2VWtO input:-webkit-autofill:hover, .styles-module__search_2VWtO input:-webkit-autofill:focus, .styles-module__search_2VWtO input:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n    .styles-module__search_2VWtO input::placeholder {\n      color: #515151; }\n    @media (max-width: 768px) {\n      .styles-module__search_2VWtO input {\n        width: 80%; } }\n    @media (max-width: 576px) {\n      .styles-module__search_2VWtO input {\n        padding: 8px 0;\n        margin-bottom: 10px;\n        width: 85%; } }\n  .styles-module__search_2VWtO button {\n    cursor: pointer;\n    position: absolute;\n    font-size: 24px;\n    right: 0;\n    transition: 0.3s;\n    color: #fff;\n    background-color: transparent;\n    border: none;\n    outline: none; }\n    .styles-module__search_2VWtO button:hover {\n      color: #ff8c05; }\n    @media (max-width: 576px) {\n      .styles-module__search_2VWtO button {\n        top: 10px; } }\n", ""]);
// Exports
exports.locals = {
	"search": "styles-module__search_2VWtO"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/socials/styles.module.scss":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/socials/styles.module.scss ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__socialsWrapper_2u8wy {\n  position: fixed;\n  z-index: 1;\n  top: 40vh;\n  right: 0;\n  color: #fff;\n  display: flex; }\n  .styles-module__socialsWrapper_2u8wy .styles-module__arrow_2JXX4 {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    opacity: 0.5;\n    height: 50px;\n    width: 50px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    border-top-left-radius: 8px;\n    border-bottom-left-radius: 8px;\n    cursor: pointer;\n    transition: 0.3s; }\n    .styles-module__socialsWrapper_2u8wy .styles-module__arrow_2JXX4 svg {\n      font-size: 24px;\n      transform: rotate(0deg);\n      transition: 0.3s; }\n    .styles-module__socialsWrapper_2u8wy .styles-module__arrow_2JXX4.styles-module__active_3LzVf {\n      opacity: 1; }\n      .styles-module__socialsWrapper_2u8wy .styles-module__arrow_2JXX4.styles-module__active_3LzVf svg {\n        transform: rotate(360deg);\n        transition: 0.3s; }\n  .styles-module__socialsWrapper_2u8wy .styles-module__socials_2TFME {\n    background: #262626;\n    width: 0px;\n    transition: 0.3s; }\n    .styles-module__socialsWrapper_2u8wy .styles-module__socials_2TFME.styles-module__active_3LzVf {\n      width: 54px;\n      transition: 0.3s; }\n    .styles-module__socialsWrapper_2u8wy .styles-module__socials_2TFME ul {\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      border-bottom-left-radius: 8px;\n      overflow: hidden; }\n      .styles-module__socialsWrapper_2u8wy .styles-module__socials_2TFME ul li {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        padding: 2px; }\n        .styles-module__socialsWrapper_2u8wy .styles-module__socials_2TFME ul li:hover {\n          background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n        .styles-module__socialsWrapper_2u8wy .styles-module__socials_2TFME ul li svg {\n          padding: 12px;\n          font-size: 18px;\n          color: #fff; }\n", ""]);
// Exports
exports.locals = {
	"socialsWrapper": "styles-module__socialsWrapper_2u8wy",
	"arrow": "styles-module__arrow_2JXX4",
	"active": "styles-module__active_3LzVf",
	"socials": "styles-module__socials_2TFME"
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
exports.push([module.i, ".styles-module__spinnerWrapper_1bYTT {\n  position: fixed;\n  z-index: 5;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #000000a1; }\n  .styles-module__spinnerWrapper_1bYTT .styles-module__spinner_3mTPc {\n    display: block;\n    width: 70%;\n    max-width: 100px;\n    border-radius: 50%;\n    border-top: 3px solid #ff8c05;\n    animation: styles-module__spin_R-TXw 1.5s linear infinite; }\n  .styles-module__spinnerWrapper_1bYTT .styles-module__spinner_3mTPc:after {\n    content: '';\n    display: block;\n    padding-top: 100%; }\n\n@keyframes styles-module__spin_R-TXw {\n  to {\n    transform: rotate(360deg); } }\n", ""]);
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
exports.push([module.i, ".styles-module__page_a8NdZ {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: #212121;\n  min-height: 100vh; }\n", ""]);
// Exports
exports.locals = {
	"page": "styles-module__page_a8NdZ"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/terms/styles.module.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/components/terms/styles.module.scss ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__termsWrapper_1Z_fC {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 75%;\n  min-height: 100vh;\n  background-color: #262626; }\n  .styles-module__termsWrapper_1Z_fC p {\n    color: #fff;\n    margin: 10px 30px; }\n", ""]);
// Exports
exports.locals = {
	"termsWrapper": "styles-module__termsWrapper_1Z_fC"
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
exports.push([module.i, ".styles-module__form_xegLd {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  box-sizing: border-box;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  height: 210px; }\n\n.styles-module__successMessage_3xt_V {\n  font-size: 2em;\n  color: #2ecc71; }\n\n.styles-module__errorMessage_3B3AU {\n  font-size: inherit;\n  color: #d61a5e;\n  height: 30px; }\n\n.styles-module__input_3xmCG {\n  border: 0;\n  border-bottom: 1px solid #515151;\n  border-radius: 0;\n  outline: none;\n  padding: 6px 0;\n  color: #fff;\n  background: transparent;\n  font-weight: 400;\n  font-size: 14px;\n  transition: border-bottom 0.3s;\n  line-height: 1.5;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  -webkit-user-select: none;\n  user-select: none;\n  width: 100%;\n  margin-bottom: 10px; }\n  .styles-module__input_3xmCG:hover, .styles-module__input_3xmCG:focus {\n    border-bottom: 1px solid #ff8c05; }\n  .styles-module__input_3xmCG:-webkit-autofill, .styles-module__input_3xmCG:-webkit-autofill:hover, .styles-module__input_3xmCG:-webkit-autofill:focus, .styles-module__input_3xmCG:-webkit-autofill:active {\n    transition: background-color 5000s ease-in-out 0s;\n    -webkit-text-fill-color: #fff; }\n  .styles-module__input_3xmCG:invalid {\n    border-color: red; }\n  .styles-module__input_3xmCG:valid {\n    border-color: green; }\n\n.styles-module__btn_1Schs {\n  cursor: pointer;\n  border: 0;\n  border-radius: 8px;\n  padding: 13px 20px;\n  background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n  font-size: 14px;\n  color: #fff;\n  outline: none;\n  font-weight: 600;\n  line-height: 1.5;\n  transition: all 2s;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  -webkit-user-select: none;\n  user-select: none;\n  width: 20%;\n  margin: 15px; }\n  .styles-module__btn_1Schs:hover {\n    background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
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
exports.push([module.i, ".styles-module__wrapperForm_1YNdx {\n  font-family: Roboto, sans-serif;\n  color: #fff;\n  width: 90%;\n  display: flex;\n  height: calc(100vh - 120px - 198px);\n  justify-content: center; }\n  @media (max-width: 1200px) {\n    .styles-module__wrapperForm_1YNdx {\n      height: calc(100vh - 120px - 367px); } }\n  .styles-module__wrapperForm_1YNdx .styles-module__form_1Axm9 {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    max-width: 640px;\n    padding: 15px;\n    align-items: center;\n    box-sizing: border-box; }\n  .styles-module__wrapperForm_1YNdx .styles-module__row_2sg6k {\n    margin: 15px 0 0 0; }\n  .styles-module__wrapperForm_1YNdx .styles-module__successMessage_3TJ6x {\n    font-size: 2em;\n    color: #2ecc71; }\n  .styles-module__wrapperForm_1YNdx .styles-module__errorMessage_33MkG {\n    font-size: inherit;\n    color: #d61a5e; }\n  .styles-module__wrapperForm_1YNdx .styles-module__btn__40Hv {\n    cursor: pointer;\n    border: 0;\n    border-radius: 8px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 14px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    width: 20%;\n    align-self: flex-end;\n    margin-top: 25px; }\n    .styles-module__wrapperForm_1YNdx .styles-module__btn__40Hv:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 14px;\n    transition: border-bottom 0.3s;\n    line-height: 1.5;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    width: 100%; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:hover, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill:hover, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill:focus, .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:invalid {\n      border-color: red; }\n    .styles-module__wrapperForm_1YNdx .styles-module__input_vqf9t:valid {\n      border-color: green; }\n", ""]);
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
exports.push([module.i, ".styles-module__title_2jy1_ {\n  color: #ff8c05;\n  font-size: 20px;\n  text-align: center; }\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  form .styles-module__reservedPlace_2sq1S {\n    height: 51px; }\n  form .styles-module__iconInput_3jVZO {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 14px;\n    transition: border-bottom 0.3s;\n    line-height: 1.5;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    display: flex;\n    width: 75%;\n    margin: 20px 15px 0;\n    align-items: center; }\n    form .styles-module__iconInput_3jVZO:hover, form .styles-module__iconInput_3jVZO:focus {\n      border-bottom: 1px solid #ff8c05; }\n    form .styles-module__iconInput_3jVZO:-webkit-autofill, form .styles-module__iconInput_3jVZO:-webkit-autofill:hover, form .styles-module__iconInput_3jVZO:-webkit-autofill:focus, form .styles-module__iconInput_3jVZO:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n    form .styles-module__iconInput_3jVZO svg {\n      font-size: 20px;\n      padding: 0 5px 0 0; }\n    form .styles-module__iconInput_3jVZO .styles-module__password_358nf {\n      width: 90%; }\n      form .styles-module__iconInput_3jVZO .styles-module__password_358nf input {\n        width: 85%; }\n    form .styles-module__iconInput_3jVZO input {\n      border-bottom: 0;\n      margin: 0;\n      padding: 0;\n      width: 90%; }\n      form .styles-module__iconInput_3jVZO input:hover, form .styles-module__iconInput_3jVZO input:focus {\n        border-bottom: 0; }\n    form .styles-module__iconInput_3jVZO .styles-module__eyeIcon_2RciF {\n      width: 10%; }\n  form input {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 14px;\n    transition: border-bottom 0.3s;\n    line-height: 1.5;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    width: 75%;\n    margin: 20px 15px 0; }\n    form input:hover, form input:focus {\n      border-bottom: 1px solid #ff8c05; }\n    form input:-webkit-autofill, form input:-webkit-autofill:hover, form input:-webkit-autofill:focus, form input:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n  form .styles-module__invalidFeedback_3P6k1 {\n    color: #d61a5e;\n    width: 75%;\n    padding: 5px 0 0 0;\n    min-height: 46px; }\n  form .styles-module__submit_fFa0v {\n    cursor: pointer;\n    border: 0;\n    border-radius: 8px;\n    padding: 13px 20px;\n    background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n    font-size: 14px;\n    color: #fff;\n    outline: none;\n    font-weight: 600;\n    line-height: 1.5;\n    transition: all 2s;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    width: 140px;\n    margin: 15px 0; }\n    form .styles-module__submit_fFa0v:hover {\n      background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  form .styles-module__socialButtonsContainer_2VX6B {\n    display: flex;\n    justify-content: space-around;\n    width: 105px;\n    margin-bottom: 10px; }\n    form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo,\n    form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y {\n      width: 40px;\n      height: 40px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      border-width: 0;\n      background: #fff;\n      color: #737373;\n      border-radius: 5px;\n      white-space: nowrap;\n      box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);\n      transition-property: background-color, box-shadow;\n      transition-duration: 150ms;\n      transition-timing-function: ease-in-out;\n      padding: 0; }\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo:focus, form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo:hover,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y:focus,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y:hover {\n        box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1); }\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo:active,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y:active {\n        background-color: #fff;\n        box-shadow: none;\n        transition-duration: 10ms; }\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo .styles-module__googleButtonIcon_3SZ2N,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__googleButton_SNMGo .styles-module__linkedinButtonIcon_3SH1P,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y .styles-module__googleButtonIcon_3SZ2N,\n      form .styles-module__socialButtonsContainer_2VX6B .styles-module__linkedinButton_2Kj3Y .styles-module__linkedinButtonIcon_3SH1P {\n        display: inline-block;\n        vertical-align: middle;\n        width: 18px;\n        height: 18px;\n        box-sizing: border-box; }\n  form .styles-module__linkForgot_3TmXG {\n    font-size: 0.7em;\n    color: #fff;\n    opacity: 0.6;\n    cursor: pointer;\n    margin-bottom: 25px;\n    transition: all 0.1s; }\n    form .styles-module__linkForgot_3TmXG:hover {\n      color: #ff8c05;\n      opacity: 1; }\n", ""]);
// Exports
exports.locals = {
	"title": "styles-module__title_2jy1_",
	"reservedPlace": "styles-module__reservedPlace_2sq1S",
	"iconInput": "styles-module__iconInput_3jVZO",
	"password": "styles-module__password_358nf",
	"eyeIcon": "styles-module__eyeIcon_2RciF",
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

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/catalogue/styles.module.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/catalogue/styles.module.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__mainPageWrapper_32Ild {\n  display: flex;\n  flex-direction: column;\n  width: 75%;\n  min-height: 100vh;\n  background-color: #262626; }\n  .styles-module__mainPageWrapper_32Ild .styles-module__searchValueWrapper_2wcxR {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    margin: 20px; }\n  .styles-module__mainPageWrapper_32Ild .styles-module__coursesWrapper_hP-qq {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: center; }\n", ""]);
// Exports
exports.locals = {
	"mainPageWrapper": "styles-module__mainPageWrapper_32Ild",
	"searchValueWrapper": "styles-module__searchValueWrapper_2wcxR",
	"coursesWrapper": "styles-module__coursesWrapper_hP-qq"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/coursePageDetails/styles.module.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js!./src/containers/coursePageDetails/styles.module.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".styles-module__coursePageDetailsWrapper_3r4C1 {\n  display: flex;\n  width: 75%;\n  background-color: #262626;\n  flex-direction: column; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 > div {\n    padding: 15px 25px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__error_1Zghu {\n    text-align: center;\n    padding: 25px 0;\n    color: #fff; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__verticalLine_1w8pg {\n    height: 15px;\n    padding-right: 1px;\n    background-color: #a0a0a0;\n    margin-left: 4px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__stars_1GT8m {\n    display: inline;\n    margin-right: 10px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__courseStats_3J7SN {\n    margin: 10px 0; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__courseTitle_qLS7x {\n    font-size: 28px;\n    font-weight: normal;\n    margin: 10px 0; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__shortDescription_yxs0s {\n    color: #fff;\n    margin: 5px 0;\n    font-size: 16px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__profitTitle_3AYb7,\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__reviewsTitle_2nnSV {\n    margin: 10px 0;\n    color: #fff;\n    font-size: 20px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__profitList_1G-Py {\n    list-style-type: none;\n    color: #fff;\n    margin: 0 0 0 15px;\n    padding: 0; }\n    .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__profitList_1G-Py li {\n      margin-bottom: 5px;\n      font-size: 15px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__reviewWrapper_2EtGn {\n    margin: 10px 0;\n    font-size: 16px; }\n    .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__reviewWrapper_2EtGn p {\n      margin: 0;\n      color: #a0a0a0; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__buttonWrapper_2kJGj {\n    margin-top: 25px;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n    .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__buttonWrapper_2kJGj .styles-module__showMoreButton_D5OXg {\n      cursor: pointer;\n      border: 0;\n      border-radius: 8px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 14px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      -o-user-select: none;\n      -webkit-user-select: none;\n      user-select: none;\n      padding: 10px 20px;\n      transition: none; }\n      .styles-module__coursePageDetailsWrapper_3r4C1 .styles-module__buttonWrapper_2kJGj .styles-module__showMoreButton_D5OXg:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__coursePageDetailsWrapper_3r4C1 hr {\n    background-color: #212121;\n    width: 100%;\n    height: 5px;\n    border: none;\n    margin-top: 15px; }\n  .styles-module__coursePageDetailsWrapper_3r4C1 span {\n    color: #fff;\n    margin-right: 10px; }\n    .styles-module__coursePageDetailsWrapper_3r4C1 span font {\n      color: #a0a0a0; }\n", ""]);
// Exports
exports.locals = {
	"coursePageDetailsWrapper": "styles-module__coursePageDetailsWrapper_3r4C1",
	"error": "styles-module__error_1Zghu",
	"verticalLine": "styles-module__verticalLine_1w8pg",
	"stars": "styles-module__stars_1GT8m",
	"courseStats": "styles-module__courseStats_3J7SN",
	"courseTitle": "styles-module__courseTitle_qLS7x",
	"shortDescription": "styles-module__shortDescription_yxs0s",
	"profitTitle": "styles-module__profitTitle_3AYb7",
	"reviewsTitle": "styles-module__reviewsTitle_2nnSV",
	"profitList": "styles-module__profitList_1G-Py",
	"reviewWrapper": "styles-module__reviewWrapper_2EtGn",
	"buttonWrapper": "styles-module__buttonWrapper_2kJGj",
	"showMoreButton": "styles-module__showMoreButton_D5OXg"
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
exports.push([module.i, ".styles-module__header_3pg0x {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: #262626;\n  padding: 20px 0;\n  color: #fff;\n  height: 50px;\n  font-size: 14px;\n  width: 75%;\n  margin: 15px 0; }\n  @media (max-width: 992px) {\n    .styles-module__header_3pg0x {\n      justify-content: space-around; } }\n  @media (max-width: 576px) {\n    .styles-module__header_3pg0x {\n      display: block;\n      height: auto;\n      padding-bottom: 0; } }\n  @media (max-width: 768px) {\n    .styles-module__header_3pg0x div {\n      padding: 0 15px;\n      text-align: center;\n      margin: 10px 0; } }\n  .styles-module__header_3pg0x .styles-module__menuIcons_bqZdN {\n    cursor: pointer; }\n    @media (max-width: 576px) {\n      .styles-module__header_3pg0x .styles-module__menuIcons_bqZdN {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        position: absolute;\n        z-index: 1;\n        right: 50px;\n        top: 50px; } }\n    .styles-module__header_3pg0x .styles-module__menuIcons_bqZdN svg {\n      font-size: 30px;\n      padding: 15px; }\n  .styles-module__header_3pg0x .styles-module__logoWrapper_3zGn0 {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0 20px; }\n    .styles-module__header_3pg0x .styles-module__logoWrapper_3zGn0 a {\n      display: flex;\n      text-decoration: none;\n      color: #fff; }\n      .styles-module__header_3pg0x .styles-module__logoWrapper_3zGn0 a span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        margin-right: 10px;\n        font-size: 22px;\n        transform: rotate(-20deg);\n        text-decoration: underline; }\n    @media (max-width: 768px) {\n      .styles-module__header_3pg0x .styles-module__logoWrapper_3zGn0 {\n        justify-content: flex-start; } }\n  .styles-module__header_3pg0x .styles-module__menu_RePKY {\n    flex: 1 1 auto;\n    display: flex;\n    justify-content: space-around;\n    align-items: center; }\n    @media (max-width: 992px) {\n      .styles-module__header_3pg0x .styles-module__menu_RePKY {\n        position: fixed;\n        top: 110px;\n        z-index: 2;\n        display: none;\n        width: 75%;\n        border-radius: 8px;\n        background-color: #262626;\n        padding: 20px 0; } }\n    @media (max-width: 768px) {\n      .styles-module__header_3pg0x .styles-module__menu_RePKY {\n        flex-direction: column; } }\n    .styles-module__header_3pg0x .styles-module__menu_RePKY select {\n      cursor: pointer;\n      width: 100px;\n      margin: 0 5px;\n      background-color: transparent;\n      padding: 10px;\n      border: 3px #212121 solid;\n      color: #fff; }\n      .styles-module__header_3pg0x .styles-module__menu_RePKY select option {\n        background-color: #262626; }\n      @media (max-width: 768px) {\n        .styles-module__header_3pg0x .styles-module__menu_RePKY select {\n          width: 200px; } }\n    .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__link_2yumC {\n      cursor: pointer;\n      font-weight: bold;\n      transition: 0.3s;\n      text-decoration: none;\n      color: #fff;\n      margin: 0 5px; }\n      .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__link_2yumC:hover {\n        color: #ff8c05;\n        text-decoration: underline; }\n    .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__button__aYRT {\n      cursor: pointer;\n      border: 0;\n      border-radius: 8px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 14px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      -o-user-select: none;\n      -webkit-user-select: none;\n      user-select: none;\n      padding: 10px 20px;\n      min-width: 100px;\n      transition: none;\n      margin: 0 20px; }\n      .styles-module__header_3pg0x .styles-module__menu_RePKY .styles-module__button__aYRT:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n  .styles-module__header_3pg0x .styles-module__authButtonsWrapper_1K89e {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center; }\n  .styles-module__header_3pg0x .styles-module__outSideMenuClick_2AKVS {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    background-color: rgba(255, 255, 255, 0.75);\n    top: 0;\n    left: 0;\n    margin: 0;\n    padding: 0; }\n", ""]);
// Exports
exports.locals = {
	"header": "styles-module__header_3pg0x",
	"menuIcons": "styles-module__menuIcons_bqZdN",
	"logoWrapper": "styles-module__logoWrapper_3zGn0",
	"menu": "styles-module__menu_RePKY",
	"link": "styles-module__link_2yumC",
	"button": "styles-module__button__aYRT",
	"authButtonsWrapper": "styles-module__authButtonsWrapper_1K89e",
	"outSideMenuClick": "styles-module__outSideMenuClick_2AKVS"
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
exports.push([module.i, ".styles-module__mainPageWrapper_1Fgra {\n  position: relative;\n  display: flex;\n  width: 75%;\n  flex-direction: column;\n  background-color: #262626;\n  margin-bottom: 20px;\n  padding-bottom: 20px; }\n  .styles-module__mainPageWrapper_1Fgra .styles-module__slider_1RKgy {\n    width: 100%;\n    font-size: 0.7em; }\n  .styles-module__mainPageWrapper_1Fgra .styles-module__slideContainer_DO3a5 {\n    padding: 25px 25px 0 25px;\n    min-height: 300px;\n    text-align: center;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-direction: column; }\n    .styles-module__mainPageWrapper_1Fgra .styles-module__slideContainer_DO3a5 h1 {\n      font-size: 28px; }\n    .styles-module__mainPageWrapper_1Fgra .styles-module__slideContainer_DO3a5 p {\n      color: #a0a0a0;\n      font-size: 24px; }\n", ""]);
// Exports
exports.locals = {
	"mainPageWrapper": "styles-module__mainPageWrapper_1Fgra",
	"slider": "styles-module__slider_1RKgy",
	"slideContainer": "styles-module__slideContainer_DO3a5"
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
exports.push([module.i, ".styles-module__accountWrapper_DYKMg {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 50px 30px;\n  padding: 0; }\n  @media screen and (max-width: 320px) {\n    .styles-module__accountWrapper_DYKMg {\n      justify-content: center; } }\n  .styles-module__accountWrapper_DYKMg form {\n    width: 50%; }\n    @media screen and (max-width: 992px) {\n      .styles-module__accountWrapper_DYKMg form {\n        width: 80%; } }\n    @media screen and (max-width: 576px) {\n      .styles-module__accountWrapper_DYKMg form {\n        width: 100%; } }\n    .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN {\n      width: 100%; }\n      .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input {\n        border: 0;\n        border-bottom: 1px solid #515151;\n        border-radius: 0;\n        outline: none;\n        padding: 6px 0;\n        color: #fff;\n        background: transparent;\n        font-weight: 400;\n        font-size: 14px;\n        transition: border-bottom 0.3s;\n        line-height: 1.5;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        -o-user-select: none;\n        -webkit-user-select: none;\n        user-select: none;\n        width: 100%;\n        margin: 15px 0; }\n        .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input:hover, .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input:focus {\n          border-bottom: 1px solid #ff8c05; }\n        .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input:-webkit-autofill, .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input:-webkit-autofill:hover, .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input:-webkit-autofill:focus, .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN input:-webkit-autofill:active {\n          transition: background-color 5000s ease-in-out 0s;\n          -webkit-text-fill-color: #fff; }\n      .styles-module__accountWrapper_DYKMg form .styles-module__password_xaKFN .styles-module__invalidFeedback_Briyq {\n        color: #d61a5e;\n        margin-top: 5px;\n        width: 100%; }\n  .styles-module__accountWrapper_DYKMg .styles-module__buttonWrapper_2LGFU {\n    display: flex;\n    justify-content: flex-end;\n    width: 100%; }\n    .styles-module__accountWrapper_DYKMg .styles-module__buttonWrapper_2LGFU button {\n      cursor: pointer;\n      border: 0;\n      border-radius: 8px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 14px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      -o-user-select: none;\n      -webkit-user-select: none;\n      user-select: none;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      width: 100px;\n      height: 50px;\n      text-align: center;\n      margin: 15px 0;\n      color: #fff;\n      border: none; }\n      .styles-module__accountWrapper_DYKMg .styles-module__buttonWrapper_2LGFU button:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"accountWrapper": "styles-module__accountWrapper_DYKMg",
	"password": "styles-module__password_xaKFN",
	"invalidFeedback": "styles-module__invalidFeedback_Briyq",
	"buttonWrapper": "styles-module__buttonWrapper_2LGFU"
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
exports.push([module.i, ".styles-module__profileWrapper_TMH0m {\n  margin: 50px 30px; }\n  @media screen and (min-width: 1200px) {\n    .styles-module__profileWrapper_TMH0m {\n      width: 540px; } }\n  @media screen and (min-width: 320px) {\n    .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw div input {\n      width: 100%;\n      margin: 10px 0; } }\n  .styles-module__profileWrapper_TMH0m input,\n  .styles-module__profileWrapper_TMH0m textarea {\n    border: 0;\n    border-bottom: 1px solid #515151;\n    border-radius: 0;\n    outline: none;\n    padding: 6px 0;\n    color: #fff;\n    background: transparent;\n    font-weight: 400;\n    font-size: 14px;\n    transition: border-bottom 0.3s;\n    line-height: 1.5;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    background-color: transparent;\n    color: #fff; }\n    .styles-module__profileWrapper_TMH0m input:hover, .styles-module__profileWrapper_TMH0m input:focus,\n    .styles-module__profileWrapper_TMH0m textarea:hover,\n    .styles-module__profileWrapper_TMH0m textarea:focus {\n      border-bottom: 1px solid #ff8c05; }\n    .styles-module__profileWrapper_TMH0m input:-webkit-autofill, .styles-module__profileWrapper_TMH0m input:-webkit-autofill:hover, .styles-module__profileWrapper_TMH0m input:-webkit-autofill:focus, .styles-module__profileWrapper_TMH0m input:-webkit-autofill:active,\n    .styles-module__profileWrapper_TMH0m textarea:-webkit-autofill,\n    .styles-module__profileWrapper_TMH0m textarea:-webkit-autofill:hover,\n    .styles-module__profileWrapper_TMH0m textarea:-webkit-autofill:focus,\n    .styles-module__profileWrapper_TMH0m textarea:-webkit-autofill:active {\n      transition: background-color 5000s ease-in-out 0s;\n      -webkit-text-fill-color: #fff; }\n    .styles-module__profileWrapper_TMH0m input::placeholder,\n    .styles-module__profileWrapper_TMH0m textarea::placeholder {\n      color: #515151; }\n  .styles-module__profileWrapper_TMH0m .styles-module__invalidFeedback_2e3ER {\n    display: block;\n    word-wrap: break-word;\n    margin-top: 10px;\n    width: 100%;\n    color: #d61a5e; }\n  .styles-module__profileWrapper_TMH0m .styles-module__userFullName_2jBVg {\n    display: flex;\n    width: 100%; }\n    .styles-module__profileWrapper_TMH0m .styles-module__userFullName_2jBVg div {\n      width: 100%; }\n      .styles-module__profileWrapper_TMH0m .styles-module__userFullName_2jBVg div input {\n        width: 100%;\n        padding: 6px 0;\n        margin: 0; }\n  .styles-module__profileWrapper_TMH0m .styles-module__description_2Ob_3 {\n    margin-top: 15px;\n    width: 100%; }\n    .styles-module__profileWrapper_TMH0m .styles-module__description_2Ob_3 textarea {\n      width: 100%;\n      padding: 6px 0;\n      margin: 0;\n      resize: none; }\n  .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw {\n    margin-top: 15px;\n    width: 100%; }\n    .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw div div {\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw div div svg {\n        font-size: 20px;\n        margin: 0 5px;\n        width: 10%; }\n      .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw div div .styles-module__facebookIcon_3GSLY {\n        color: #3b5998; }\n      .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw div div .styles-module__twitterIcon_kUJFh {\n        color: #1da1f2; }\n      .styles-module__profileWrapper_TMH0m .styles-module__social_1LvOw div div .styles-module__linkedinIcon_5rJPK {\n        color: #0073b0; }\n  .styles-module__profileWrapper_TMH0m .styles-module__buttonsWrapper_2TIgq {\n    display: flex;\n    justify-content: flex-end;\n    width: 100%; }\n    .styles-module__profileWrapper_TMH0m .styles-module__buttonsWrapper_2TIgq button {\n      cursor: pointer;\n      border: 0;\n      border-radius: 8px;\n      padding: 13px 20px;\n      background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n      font-size: 14px;\n      color: #fff;\n      outline: none;\n      font-weight: 600;\n      line-height: 1.5;\n      transition: all 2s;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      -o-user-select: none;\n      -webkit-user-select: none;\n      user-select: none;\n      width: 100px;\n      height: 50px;\n      margin: 15px 0; }\n      .styles-module__profileWrapper_TMH0m .styles-module__buttonsWrapper_2TIgq button:hover {\n        background: linear-gradient(135deg, #ff8c05 20%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"profileWrapper": "styles-module__profileWrapper_TMH0m",
	"social": "styles-module__social_1LvOw",
	"invalidFeedback": "styles-module__invalidFeedback_2e3ER",
	"userFullName": "styles-module__userFullName_2jBVg",
	"description": "styles-module__description_2Ob_3",
	"facebookIcon": "styles-module__facebookIcon_3GSLY",
	"twitterIcon": "styles-module__twitterIcon_kUJFh",
	"linkedinIcon": "styles-module__linkedinIcon_5rJPK",
	"buttonsWrapper": "styles-module__buttonsWrapper_2TIgq"
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
exports.push([module.i, ".styles-module__profileWrapper_3jWcQ {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-width: 75%; }\n  .styles-module__profileWrapper_3jWcQ .styles-module__publicWrapper_2kA-L {\n    background-color: #262626;\n    min-height: 80vh;\n    width: 100%; }\n  .styles-module__profileWrapper_3jWcQ .styles-module__navWrapper_1pTsn {\n    align-self: flex-start;\n    margin: 0 20px; }\n    .styles-module__profileWrapper_3jWcQ .styles-module__navWrapper_1pTsn ul {\n      display: flex;\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n      .styles-module__profileWrapper_3jWcQ .styles-module__navWrapper_1pTsn ul button {\n        background: transparent;\n        outline: none;\n        cursor: pointer;\n        width: 100px;\n        height: 40px;\n        background-color: #262626;\n        border: none;\n        color: #fff;\n        border-top-right-radius: 20px; }\n        .styles-module__profileWrapper_3jWcQ .styles-module__navWrapper_1pTsn ul button.styles-module__active_1H3Fr {\n          background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n        .styles-module__profileWrapper_3jWcQ .styles-module__navWrapper_1pTsn ul button:hover {\n          background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%);\n          transition: 0.3s; }\n      .styles-module__profileWrapper_3jWcQ .styles-module__navWrapper_1pTsn ul .styles-module__activeButton_1MgeI {\n        background: linear-gradient(135deg, #ff8c05 0%, #d61a5e 100%); }\n", ""]);
// Exports
exports.locals = {
	"profileWrapper": "styles-module__profileWrapper_3jWcQ",
	"publicWrapper": "styles-module__publicWrapper_2kA-L",
	"navWrapper": "styles-module__navWrapper_1pTsn",
	"active": "styles-module__active_1H3Fr",
	"activeButton": "styles-module__activeButton_1MgeI"
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
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var _containers_header__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../containers/header */ "./src/containers/header/index.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./main */ "./src/components/main/index.js");
/* harmony import */ var _footer_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./footer/index */ "./src/components/footer/index.js");
/* harmony import */ var _errorBoundary__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./errorBoundary */ "./src/components/errorBoundary/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_18__);



















var history = Object(history__WEBPACK_IMPORTED_MODULE_12__["createBrowserHistory"])();

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
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default.a.page
      }, "\xA0\xA0\xA0\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["Router"], {
        history: history
      }, "\xA0\xA0\xA0\xA0\xA0\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_errorBoundary__WEBPACK_IMPORTED_MODULE_16__["ErrorBoundary"], null, "\xA0\xA0\xA0\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_containers_header__WEBPACK_IMPORTED_MODULE_13__["default"], null), "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_main__WEBPACK_IMPORTED_MODULE_14__["Main"], null), " \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_footer_index__WEBPACK_IMPORTED_MODULE_15__["default"], null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_10__["ToastContainer"], null), " \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0"), " \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0"), "\xA0\xA0\xA0\xA0\xA0\xA0");
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

App.propTypes = {
  refreshLoginRequest: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired
};
var mapDispatchToProps = {
  refreshLoginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_17__["refreshLoginRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(null, mapDispatchToProps)(App));

/***/ }),

/***/ "./src/components/courseCard/index.js":
/*!********************************************!*\
  !*** ./src/components/courseCard/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_star_ratings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-star-ratings */ "./node_modules/react-star-ratings/build/index.js");
/* harmony import */ var react_star_ratings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_star_ratings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _img_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/index */ "./src/components/img/index.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.module.scss */ "./src/components/courseCard/style.module.scss");
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_7__);









var CourseCard = function CourseCard(props) {
  var title = props.title,
      authors = props.authors,
      rate = props.rate,
      price = props.price,
      _props$img = props.img,
      img = _props$img === void 0 ? '' : _props$img,
      id = props.id,
      translate = props.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "".concat(_utils_constants__WEBPACK_IMPORTED_MODULE_6__["links"].coursePreview).concat(id),
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCard
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_img_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
    src: img,
    alt: "Course Preview",
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardPreview
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardDescription
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardTitle
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardAuthor
  }, authors), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardRate
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_star_ratings__WEBPACK_IMPORTED_MODULE_3___default.a, {
    rating: rate,
    starRatedColor: "#ff8c05",
    numberOfStars: 5,
    starDimension: "20px",
    starSpacing: "5px",
    name: "rating"
  }), "(", rate, ")"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _style_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.courseCardPrice
  }, translate("".concat(price ? "".concat(price, " $") : 'For free'))))));
};

CourseCard.propTypes = {
  course: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    authors: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    rate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    price: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    img: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    votes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
  })
};
CourseCard.defaultProps = {
  course: {
    price: 'For Free',
    img: ''
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_4__["withTranslation"])('translations')(CourseCard));

/***/ }),

/***/ "./src/components/courseCard/style.module.scss":
/*!*****************************************************!*\
  !*** ./src/components/courseCard/style.module.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./style.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/courseCard/style.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./style.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/courseCard/style.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./style.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/courseCard/style.module.scss");

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

/***/ "./src/components/coursesCarousel/index.js":
/*!*************************************************!*\
  !*** ./src/components/coursesCarousel/index.js ***!
  \*************************************************/
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-alice-carousel */ "./node_modules/react-alice-carousel/lib/react-alice-carousel.js");
/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-icons/io */ "./node_modules/react-icons/io/index.esm.js");
/* harmony import */ var _services_course__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/course */ "./src/services/course.js");
/* harmony import */ var _courseCard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../courseCard */ "./src/components/courseCard/index.js");
/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-alice-carousel/lib/alice-carousel.css */ "./node_modules/react-alice-carousel/lib/alice-carousel.css");
/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/coursesCarousel/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_15__);
















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
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(CoursesCarousel, _Component);

  function CoursesCarousel() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CoursesCarousel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(CoursesCarousel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      courses: [],
      currentIndex: 0,
      lastSlide: 0,
      slide: 0,
      galleryItems: []
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "slidePrev", function () {
      _this.Carousel.slidePrev();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "slideNext", function () {
      _this.Carousel.slideNext();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onSlideChanged", function (e) {
      var lastSlide = Math.ceil(_this.state.galleryItems.length / e.itemsInSlide);

      _this.setState({
        currentIndex: e.item,
        slide: e.slide + 1,
        lastSlide: lastSlide
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(CoursesCarousel, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _ref, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_services_course__WEBPACK_IMPORTED_MODULE_12__["getCoursesForCarousel"])();

              case 2:
                _ref = _context.sent;
                data = _ref.data;
                this.setState({
                  courses: data
                });
                this.setState({
                  galleryItems: this.galleryItems()
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "galleryItems",
    value: function galleryItems() {
      return this.state.courses ? this.state.courses.map(function (course, index) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.courseCardContainer
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_courseCard__WEBPACK_IMPORTED_MODULE_13__["default"], {
          key: index,
          title: course.courseName,
          authors: course.authors,
          rate: course.rating,
          id: course.id,
          price: course.price
        }));
      }) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          galleryItems = _this$state.galleryItems,
          currentIndex = _this$state.currentIndex,
          lastSlide = _this$state.lastSlide,
          slide = _this$state.slide;
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("section", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.carouselContainer
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.navButton,
        type: "button",
        onClick: this.slidePrev
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_11__["IoIosArrowBack"], {
        color: "white",
        className: currentIndex > 0 ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.carouselArrows : "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.carouselArrows, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.disabled)
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.carousel
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_alice_carousel__WEBPACK_IMPORTED_MODULE_10___default.a, {
        items: galleryItems,
        mouseDragEnabled: true,
        infinite: false,
        responsive: responsive,
        buttonsDisabled: true,
        slideToIndex: currentIndex,
        onSlideChanged: this.onSlideChanged,
        ref: function ref(el) {
          return _this2.Carousel = el;
        }
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.navButton,
        type: "button",
        onClick: this.slideNext
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_11__["IoIosArrowForward"], {
        color: "white",
        className: slide !== lastSlide || lastSlide === 0 ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.carouselArrows : "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.carouselArrows, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.disabled)
      })));
    }
  }]);

  return CoursesCarousel;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (CoursesCarousel);

/***/ }),

/***/ "./src/components/coursesCarousel/styles.module.scss":
/*!***********************************************************!*\
  !*** ./src/components/coursesCarousel/styles.module.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/coursesCarousel/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/coursesCarousel/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/coursesCarousel/styles.module.scss");

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

/***/ "./src/components/errorBoundary/index.js":
/*!***********************************************!*\
  !*** ./src/components/errorBoundary/index.js ***!
  \***********************************************/
/*! exports provided: ErrorBoundary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundary", function() { return ErrorBoundary; });
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
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/errorBoundary/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_8__);









var ErrorBoundary =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ErrorBoundary, _Component);

  function ErrorBoundary() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ErrorBoundary)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      error: null,
      errorData: null
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "componentDidCatch", function (error, errorData) {
      _this.setState({
        error: error,
        errorData: errorData
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ErrorBoundary, [{
    key: "render",
    value: function render() {
      return this.state.errorData ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_8___default.a.errorWrapper
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h1", null, "Server is not responding. Try again later.")) : this.props.children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/***/ }),

/***/ "./src/components/errorBoundary/styles.module.scss":
/*!*********************************************************!*\
  !*** ./src/components/errorBoundary/styles.module.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/errorBoundary/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/errorBoundary/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/errorBoundary/styles.module.scss");

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

/***/ "./src/components/footer/index.js":
/*!****************************************!*\
  !*** ./src/components/footer/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/footer/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);





var Footer = function Footer(props) {
  var translate = props.t;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.footer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.logoWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "DP"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "".concat(props.t('Copyright (c) DasPish Corporate')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.termsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/terms"
  }, "".concat(translate('Terms'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/privacy"
  }, "".concat(translate('Privacy Policy and Cookie Policy')))));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__["withTranslation"])('translations')(Footer));

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

/***/ "./src/components/img/index.js":
/*!*************************************!*\
  !*** ./src/components/img/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/dist/bundle.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.js");












var Img =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Img, _Component);

  function Img() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Img);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Img)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "refImg", react__WEBPACK_IMPORTED_MODULE_8___default.a.createRef());

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "state", {
      isLoading: true
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onLoad", function () {
      _this.setState({
        isLoading: false
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onError", function () {
      var image = _this.refImg.current;

      _this.setState({
        isLoading: false
      });

      image.src = _utils_constants__WEBPACK_IMPORTED_MODULE_10__["links"].placeHolderImage;
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Img, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var image = this.refImg.current;
      image.addEventListener('load', this.onLoad);
      image.addEventListener('error', this.onError);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var image = this.refImg.current;
      image.removeEventListener('load', this.onLoad);
      image.removeEventListener('error', this.onError);
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var isLoading = this.state.isLoading;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, isLoading && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_9___default.a, {
        duration: 2,
        width: "100%",
        height: "100%"
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("img", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        ref: this.refImg
      }, props, {
        alt: "Loading..."
      })));
    }
  }]);

  return Img;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Img);

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
/* harmony import */ var _coursesCarousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../coursesCarousel */ "./src/components/coursesCarousel/index.js");



var Layout = function Layout() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_mainPage__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_coursesCarousel__WEBPACK_IMPORTED_MODULE_2__["default"], null));
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
/* harmony import */ var _containers_profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/profile */ "./src/containers/profile/index.jsx");
/* harmony import */ var _containers_auth_resetPassword__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../containers/auth/resetPassword */ "./src/containers/auth/resetPassword/index.js");
/* harmony import */ var _containers_catalogue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/catalogue */ "./src/containers/catalogue/index.js");
/* harmony import */ var _containers_coursePageDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../containers/coursePageDetails */ "./src/containers/coursePageDetails/index.jsx");
/* harmony import */ var _terms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../terms */ "./src/components/terms/index.js");
/* harmony import */ var _privacy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../privacy */ "./src/components/privacy/index.js");









var Main = function Main() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/",
    component: _layout__WEBPACK_IMPORTED_MODULE_2__["Layout"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/catalogue",
    component: _containers_catalogue__WEBPACK_IMPORTED_MODULE_5__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/reset",
    component: _containers_auth_resetPassword__WEBPACK_IMPORTED_MODULE_4__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/course/preview/:id",
    component: _containers_coursePageDetails__WEBPACK_IMPORTED_MODULE_6__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/terms",
    component: _terms__WEBPACK_IMPORTED_MODULE_7__["Terms"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/privacy",
    component: _privacy__WEBPACK_IMPORTED_MODULE_8__["Privacy"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_profile__WEBPACK_IMPORTED_MODULE_3__["ProfileRouters"], null)));
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

/***/ "./src/components/privacy/index.js":
/*!*****************************************!*\
  !*** ./src/components/privacy/index.js ***!
  \*****************************************/
/*! exports provided: Privacy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Privacy", function() { return Privacy; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/privacy/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);


var Privacy = function Privacy() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.privacyWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Privacy Policy"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus mauris, in egestas sapien pharetra eu. Sed suscipit sit amet tellus a feugiat. Duis feugiat diam id elit tincidunt ullamcorper. Sed quis pretium est. Integer sed elit a elit tincidunt rhoncus. In imperdiet erat erat, pharetra rhoncus odio convallis vel. In id augue luctus, elementum neque vel, sagittis velit. Aliquam quis enim dolor. Etiam at urna vulputate, volutpat erat id, gravida nulla. Duis mi mauris, iaculis nec ligula ut, auctor finibus urna. Phasellus posuere nisi lorem, vestibulum fringilla nibh facilisis porta."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus mauris, in egestas sapien pharetra eu. Sed suscipit sit amet tellus a feugiat. Duis feugiat diam id elit tincidunt ullamcorper. Sed quis pretium est. Integer sed elit a elit tincidunt rhoncus. In imperdiet erat erat, pharetra rhoncus odio convallis vel. In id augue luctus, elementum neque vel, sagittis velit. Aliquam quis enim dolor. Etiam at urna vulputate, volutpat erat id, gravida nulla. Duis mi mauris, iaculis nec ligula ut, auctor finibus urna. Phasellus posuere nisi lorem, vestibulum fringilla nibh facilisis porta."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus mauris, in egestas sapien pharetra eu. Sed suscipit sit amet tellus a feugiat. Duis feugiat diam id elit tincidunt ullamcorper. Sed quis pretium est. Integer sed elit a elit tincidunt rhoncus. In imperdiet erat erat, pharetra rhoncus odio convallis vel. In id augue luctus, elementum neque vel, sagittis velit. Aliquam quis enim dolor. Etiam at urna vulputate, volutpat erat id, gravida nulla. Duis mi mauris, iaculis nec ligula ut, auctor finibus urna. Phasellus posuere nisi lorem, vestibulum fringilla nibh facilisis porta."));
};

/***/ }),

/***/ "./src/components/privacy/styles.module.scss":
/*!***************************************************!*\
  !*** ./src/components/privacy/styles.module.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/privacy/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/privacy/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/privacy/styles.module.scss");

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

/***/ "./src/components/search/index.js":
/*!****************************************!*\
  !*** ./src/components/search/index.js ***!
  \****************************************/
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
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/md */ "./node_modules/react-icons/md/index.esm.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/search/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_11__);













var Search =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Search, _Component);

  function Search() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Search);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Search)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "state", {
      searchValue: ''
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onChange", function (e) {
      _this.setState({
        searchValue: e.target.value
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSubmit", function (e) {
      e.preventDefault();
      _this.state.searchValue && _this.props.history.push("/catalogue?search=".concat(_this.state.searchValue, "&limit=10"));
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Search, [{
    key: "render",
    value: function render() {
      var translate = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("form", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.search,
        onSubmit: this.onSubmit
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        name: "searchValue",
        value: this.state.searchValue,
        placeholder: "".concat(translate('Please enter course name, description or author')),
        onChange: this.onChange
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        type: "submit"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_9__["MdSearch"], {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a.icon
      })));
    }
  }]);

  return Search;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["withRouter"])(Object(react_i18next__WEBPACK_IMPORTED_MODULE_10__["withTranslation"])('translations')(Search)));

/***/ }),

/***/ "./src/components/search/styles.module.scss":
/*!**************************************************!*\
  !*** ./src/components/search/styles.module.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/search/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/search/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/search/styles.module.scss");

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

/***/ "./src/components/socials/index.jsx":
/*!******************************************!*\
  !*** ./src/components/socials/index.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/io */ "./node_modules/react-icons/io/index.esm.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/socials/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);





var Socials = function Socials() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.socialsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: isOpen ? "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.arrow, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.active) : _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.arrow,
    onClick: function onClick() {
      return setOpen(!isOpen);
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoIosGlobe"], null)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: isOpen ? "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.socials, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.active) : _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.socials
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://www.youtube.com/user/iTechArt"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoLogoYoutube"], null))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://vk.com/itechart.group"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoLogoVk"], null))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://www.facebook.com/iTechArt.Group"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoLogoFacebook"], null))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "mailto:careers@itechart-group.com"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoIosMail"], null))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Socials);

/***/ }),

/***/ "./src/components/socials/styles.module.scss":
/*!***************************************************!*\
  !*** ./src/components/socials/styles.module.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/socials/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/socials/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/socials/styles.module.scss");

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

/***/ "./src/components/spinner/index.js":
/*!*****************************************!*\
  !*** ./src/components/spinner/index.js ***!
  \*****************************************/
/*! exports provided: Spinner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return Spinner; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/spinner/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);


var Spinner = function Spinner() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.spinnerWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.spinner
  }));
};

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

/***/ "./src/components/terms/index.js":
/*!***************************************!*\
  !*** ./src/components/terms/index.js ***!
  \***************************************/
/*! exports provided: Terms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Terms", function() { return Terms; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.scss */ "./src/components/terms/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_1__);


var Terms = function Terms() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.termsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Terms"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus mauris, in egestas sapien pharetra eu. Sed suscipit sit amet tellus a feugiat. Duis feugiat diam id elit tincidunt ullamcorper. Sed quis pretium est. Integer sed elit a elit tincidunt rhoncus. In imperdiet erat erat, pharetra rhoncus odio convallis vel. In id augue luctus, elementum neque vel, sagittis velit. Aliquam quis enim dolor. Etiam at urna vulputate, volutpat erat id, gravida nulla. Duis mi mauris, iaculis nec ligula ut, auctor finibus urna. Phasellus posuere nisi lorem, vestibulum fringilla nibh facilisis porta."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus mauris, in egestas sapien pharetra eu. Sed suscipit sit amet tellus a feugiat. Duis feugiat diam id elit tincidunt ullamcorper. Sed quis pretium est. Integer sed elit a elit tincidunt rhoncus. In imperdiet erat erat, pharetra rhoncus odio convallis vel. In id augue luctus, elementum neque vel, sagittis velit. Aliquam quis enim dolor. Etiam at urna vulputate, volutpat erat id, gravida nulla. Duis mi mauris, iaculis nec ligula ut, auctor finibus urna. Phasellus posuere nisi lorem, vestibulum fringilla nibh facilisis porta."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus mauris, in egestas sapien pharetra eu. Sed suscipit sit amet tellus a feugiat. Duis feugiat diam id elit tincidunt ullamcorper. Sed quis pretium est. Integer sed elit a elit tincidunt rhoncus. In imperdiet erat erat, pharetra rhoncus odio convallis vel. In id augue luctus, elementum neque vel, sagittis velit. Aliquam quis enim dolor. Etiam at urna vulputate, volutpat erat id, gravida nulla. Duis mi mauris, iaculis nec ligula ut, auctor finibus urna. Phasellus posuere nisi lorem, vestibulum fringilla nibh facilisis porta."));
};

/***/ }),

/***/ "./src/components/terms/styles.module.scss":
/*!*************************************************!*\
  !*** ./src/components/terms/styles.module.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/terms/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/terms/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/components/terms/styles.module.scss");

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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _utils_toast__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/toast */ "./src/utils/toast.js");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../services/auth */ "./src/services/auth.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/modal */ "./src/components/modal/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/auth/forgotPassword/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_18__);




















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
      success: false
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "preValidateForm", function (_ref) {
      var email = _ref.email;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_15__["emailValidate"])(email);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_9___default()(errors)) {
        Object(_utils_toast__WEBPACK_IMPORTED_MODULE_13__["showToast"])('error', errors.email);
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
                  _context.next = 12;
                  break;
                }

                _this.setState({
                  pending: true,
                  message: null
                });

                _context.next = 7;
                return Object(_services_auth__WEBPACK_IMPORTED_MODULE_14__["forgotPasswordRequest"])({
                  email: email
                });

              case 7:
                _ref3 = _context.sent;
                status = _ref3.status;
                message = _ref3.message;
                if (status !== 200) Object(_utils_toast__WEBPACK_IMPORTED_MODULE_13__["showToast"])('error', message);

                _this.setState({
                  pending: false,
                  message: message,
                  success: status === 200
                });

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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "modalClose", function () {
      var onModalClose = _this.props.onModalClose;
      onModalClose(false);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onChangeInput", function (e) {
      _this.setState({
        email: e.target.value,
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
          success = _this$state.success;
      var _this$props = this.props,
          modalStatus = _this$props.modalStatus,
          translate = _this$props.t;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_17__["Modal"], {
        open: modalStatus,
        onClose: this.modalClose
      }, !pending && !success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("form", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default.a.input,
        placeholder: "".concat(translate('Enter E-mail')),
        name: "forgot-password-id",
        id: "forgot-password-id",
        type: "email",
        onChange: this.onChangeInput,
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        type: "submit",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default.a.btn),
        onClick: this.send
      }, "".concat(translate('Send')))), pending && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_16__["Spinner"], {
        loading: pending
      }), !pending && message && success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default.a.form, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_18___default.a.successMessage)
      }, message));
    }
  }]);

  return ForgotPassword;
}(react__WEBPACK_IMPORTED_MODULE_10__["PureComponent"]);

ForgotPassword.propTypes = {
  modalStatus: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool.isRequired,
  onModalClose: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_12__["withTranslation"])('translations')(ForgotPassword));

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
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _utils_toast__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../utils/toast */ "./src/utils/toast.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/modal */ "./src/components/modal/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _public_assets_google_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../public/assets/google.svg */ "./public/assets/google.svg");
/* harmony import */ var _public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../public/assets/linkedin.svg */ "./public/assets/linkedin.svg");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../styles.module.scss */ "./src/containers/auth/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_23__);

























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
      hidden: true,
      isLoading: false
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "closeModal", function () {
      var onModalClose = _this.props.onModalClose;
      onModalClose(false);

      _this.setState({
        email: '',
        password: ''
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "passwordVisibility", function () {
      _this.setState(function (previousState) {
        return {
          hidden: !previousState.hidden
        };
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
        password: ''
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
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_19__["loginValidate"])(email, password);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(errors)) {
        Object.keys(errors).forEach(function (key) {
          Object(_utils_toast__WEBPACK_IMPORTED_MODULE_15__["showToast"])('error', errors[key]);
        });
      } else {
        var request = new Promise(function (resolve, reject) {
          _this.setState({
            isLoading: true
          });

          loginRequest({
            email: email,
            password: password,
            resolve: resolve,
            reject: reject
          });
        });
        request.then(function () {
          Object(_utils_toast__WEBPACK_IMPORTED_MODULE_15__["showToast"])('success', 'Login success');
          onModalClose(false);

          _this.setState({
            isLoading: false
          });
        }, function (errors) {
          Object(_utils_toast__WEBPACK_IMPORTED_MODULE_15__["showToast"])('error', errors.message);

          _this.setState({
            isLoading: false
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
          isLoading = _this$state2.isLoading,
          email = _this$state2.email,
          password = _this$state2.password;
      var _this$props4 = this.props,
          modalStatus = _this$props4.modalStatus,
          translate = _this$props4.t;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_17__["Modal"], {
        open: modalStatus,
        onClose: this.closeModal
      }, isLoading && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_16__["Spinner"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h2", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.title
      }, "".concat(translate('Log In to your Das Pish account'))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.onSubmit,
        noValidate: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.iconInput
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaEnvelope"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "email",
        id: "email",
        name: "email",
        value: email,
        placeholder: "E-Mail",
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.iconInput
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.password
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaLock"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: this.state.hidden ? 'password' : 'text',
        id: "password",
        name: "password",
        value: password,
        placeholder: "".concat(translate('Password')),
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.eyeIcon,
        onClick: this.passwordVisibility
      }, this.state.hidden ? react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaEye"], null) : react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaEyeSlash"], null))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.submit
      }, "".concat(translate('Log In'))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.socialButtonsContainer
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_20__["links"].googleURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.googleButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.googleButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_google_svg__WEBPACK_IMPORTED_MODULE_21__["default"], null)))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_20__["links"].linkedInURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.linkedinButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.linkedinButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_22__["default"], null))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        onClick: this.openForgotPasswordModal,
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.linkForgot
      }, "".concat(translate('Forgot Password?'))))));
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
  loginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_18__["loginRequest"],
  socialLoginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_18__["socialLoginRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(null, mapDispatchToProps)(Object(react_i18next__WEBPACK_IMPORTED_MODULE_14__["withTranslation"])('translations')(Login))));

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
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.esm.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _utils_toast__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../utils/toast */ "./src/utils/toast.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/modal */ "./src/components/modal/index.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _public_assets_google_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../public/assets/google.svg */ "./public/assets/google.svg");
/* harmony import */ var _public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../public/assets/linkedin.svg */ "./public/assets/linkedin.svg");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../styles.module.scss */ "./src/containers/auth/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_23__);

























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
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      hidden: true,
      isLoading: false
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "passwordVisibility", function () {
      _this.setState(function (previousState) {
        return {
          hidden: !previousState.hidden
        };
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "closeModal", function () {
      _this.props.onModalClose(false);

      _this.setState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "alreadyHaveAccount", function () {
      _this.closeModal();

      _this.props.onModalCloseLog(true);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onChange", function (event) {
      _this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({}, event.target.name, event.target.value));
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSubmit", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
          userName = _this$state.userName,
          email = _this$state.email,
          password = _this$state.password,
          confirmPassword = _this$state.confirmPassword;
      var _this$props = _this.props,
          registerRequest = _this$props.registerRequest,
          onModalClose = _this$props.onModalClose;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_18__["registerValidate"])(userName, email, password, confirmPassword);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(errors)) {
        Object.keys(errors).forEach(function (key) {
          Object(_utils_toast__WEBPACK_IMPORTED_MODULE_15__["showToast"])('error', errors[key]);
        });
      } else {
        var request = new Promise(function (resolve, reject) {
          _this.setState({
            isLoading: true
          });

          registerRequest({
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            resolve: resolve,
            reject: reject
          });
        });
        request.then(function () {
          Object(_utils_toast__WEBPACK_IMPORTED_MODULE_15__["showToast"])('success', 'Registration success');
          onModalClose(false);

          _this.setState({
            isLoading: false
          });
        }, function (errors) {
          Object(_utils_toast__WEBPACK_IMPORTED_MODULE_15__["showToast"])('error', errors.message);

          _this.setState({
            isLoading: false
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
          userName = _this$state2.userName,
          email = _this$state2.email,
          password = _this$state2.password,
          confirmPassword = _this$state2.confirmPassword,
          isLoading = _this$state2.isLoading;
      var _this$props3 = this.props,
          modalStatus = _this$props3.modalStatus,
          translate = _this$props3.t;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_modal__WEBPACK_IMPORTED_MODULE_17__["Modal"], {
        open: modalStatus,
        onClose: this.closeModal
      }, isLoading && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_16__["Spinner"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h2", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.title
      }, "".concat(translate('Create account and be a DasPish member!'))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.onSubmit,
        noValidate: true
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.iconInput
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaUserAlt"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "text",
        id: "userName",
        name: "userName",
        value: userName,
        placeholder: "".concat(translate('Username')),
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.iconInput
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaEnvelope"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "email",
        id: "email",
        name: "email",
        value: email,
        placeholder: "E-Mail",
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.iconInput
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.password
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaLock"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: this.state.hidden ? 'password' : 'text',
        id: "password",
        name: "password",
        value: password,
        placeholder: "".concat(translate('Password')),
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.eyeIcon,
        onClick: this.passwordVisibility
      }, this.state.hidden ? react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaEye"], null) : react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaEyeSlash"], null))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.iconInput
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_13__["FaLock"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: this.state.hidden ? 'password' : 'text',
        id: "confirmPassword",
        name: "confirmPassword",
        value: confirmPassword,
        placeholder: "".concat(translate('Confirm Password')),
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.submit
      }, "".concat(translate('Create account'))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.socialButtonsContainer
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_20__["links"].googleURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.googleButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.googleButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_google_svg__WEBPACK_IMPORTED_MODULE_21__["default"], null)))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        href: _utils_constants__WEBPACK_IMPORTED_MODULE_20__["links"].linkedInURL
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.linkedinButton
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.linkedinButtonIcon
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_public_assets_linkedin_svg__WEBPACK_IMPORTED_MODULE_22__["default"], null))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        onClick: this.alreadyHaveAccount,
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_23___default.a.linkForgot
      }, "".concat(translate('Already have an account?'))))));
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
  registerRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_19__["registerRequest"],
  socialLoginRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_19__["socialLoginRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(null, mapDispatchToProps)(Object(react_i18next__WEBPACK_IMPORTED_MODULE_14__["withTranslation"])('translations')(Register))));

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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../services/auth */ "./src/services/auth.js");
/* harmony import */ var _validation_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../validation/auth */ "./src/validation/auth.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/auth/resetPassword/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17__);



















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
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_15__["changePasswordValidate"])(password, passwordConfirm);

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
                return Object(_services_auth__WEBPACK_IMPORTED_MODULE_14__["resetPassword"])({
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
      var translate = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.wrapperForm
      }, !pending && !success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("form", {
        name: "resetPasswordForm",
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Enter Password",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.input, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.row),
        onChange: this.onChangeInput,
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
        type: "password",
        name: "passwordConfirm",
        id: "passwordConfirm",
        placeholder: "Confirm Password",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.input, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.row),
        onChange: this.onChangeInput,
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.row, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.errorMessage)
      }, errors.password || message), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        type: "submit",
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.btn),
        onClick: this.sendReset
      }, translate('Push'))), pending && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.form
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_16__["Spinner"], {
        loading: pending
      })), !pending && success && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.form, " ").concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_17___default.a.successMessage)
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

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_13__["withTranslation"])('translations')(ResetPassword));

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

/***/ "./src/containers/catalogue/index.js":
/*!*******************************************!*\
  !*** ./src/containers/catalogue/index.js ***!
  \*******************************************/
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _components_courseCard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/courseCard */ "./src/components/courseCard/index.js");
/* harmony import */ var _services_course__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/course */ "./src/services/course.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/catalogue/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_15__);

















var Catalogue =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(Catalogue, _Component);

  function Catalogue() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Catalogue);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Catalogue)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      courses: [],
      isLoading: true,
      searchValue: ''
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "componentDidMount",
    /*#__PURE__*/
    _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var location, query, courses;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              location = _this.props.location;
              query = query_string__WEBPACK_IMPORTED_MODULE_10___default.a.parse(location.search);
              _context.next = 4;
              return Object(_services_course__WEBPACK_IMPORTED_MODULE_14__["getCoursesByAttribute"])(query.search, query.limit);

            case 4:
              courses = _context.sent;

              _this.setState({
                courses: courses,
                isLoading: false,
                searchValue: query.search
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "componentDidUpdate",
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(prevProps) {
        var location, query, courses;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                location = _this.props.location;
                query = query_string__WEBPACK_IMPORTED_MODULE_10___default.a.parse(location.search);

                if (!(location.search !== prevProps.location.search)) {
                  _context2.next = 8;
                  break;
                }

                _this.setState({
                  isLoading: true
                });

                _context2.next = 6;
                return Object(_services_course__WEBPACK_IMPORTED_MODULE_14__["getCoursesByAttribute"])(query.search, query.limit);

              case 6:
                courses = _context2.sent;

                _this.setState({
                  courses: courses,
                  isLoading: false,
                  searchValue: query.search
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Catalogue, [{
    key: "render",
    value: function render() {
      var translate = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("main", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.mainPageWrapper
      }, this.state.isLoading ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_12__["Spinner"], null) : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_9___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.searchValueWrapper
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h3", null, "/", this.state.searchValue, "/")), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("section", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_15___default.a.coursesWrapper
      }, this.state.courses.length !== 0 ? this.state.courses.map(function (course, index) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_courseCard__WEBPACK_IMPORTED_MODULE_13__["default"], {
          key: index,
          title: course.coursename,
          authors: course.authors,
          rate: course.rating,
          id: course.id,
          price: course.price
        });
      }) : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h2", null, translate('There are no courses with'), ' ', this.state.searchValue, " ", translate('value')))));
    }
  }]);

  return Catalogue;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_11__["withTranslation"])('translations')(Catalogue));

/***/ }),

/***/ "./src/containers/catalogue/styles.module.scss":
/*!*****************************************************!*\
  !*** ./src/containers/catalogue/styles.module.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/catalogue/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/catalogue/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/catalogue/styles.module.scss");

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

/***/ "./src/containers/coursePageDetails/index.jsx":
/*!****************************************************!*\
  !*** ./src/containers/coursePageDetails/index.jsx ***!
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_star_ratings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-star-ratings */ "./node_modules/react-star-ratings/build/index.js");
/* harmony import */ var react_star_ratings__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_star_ratings__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _services_course__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/course */ "./src/services/course.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/coursePageDetails/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_14__);
















var coursePageDetails =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(coursePageDetails, _Component);

  function coursePageDetails() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, coursePageDetails);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(coursePageDetails)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      course: {},
      error: null,
      showReviewsNum: 1,
      isLoading: true
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "showMoreReviews", function () {
      var _this$state = _this.state,
          course = _this$state.course,
          showReviewsNum = _this$state.showReviewsNum;
      if (course.courseReviews.length > showReviewsNum) _this.setState({
        showReviewsNum: showReviewsNum + 2
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(coursePageDetails, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var courseId, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                courseId = this.props.match.params.id;
                _context.next = 3;
                return Object(_services_course__WEBPACK_IMPORTED_MODULE_12__["getCourseDetails"])(courseId);

              case 3:
                response = _context.sent;
                response.error ? this.setState({
                  error: response.data,
                  isLoading: false
                }) : this.setState({
                  course: response.data,
                  isLoading: false
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state$course = this.state.course,
          courseName = _this$state$course.courseName,
          description = _this$state$course.description,
          rating = _this$state$course.rating,
          numberOfEnrolledStudents = _this$state$course.numberOfEnrolledStudents,
          authors = _this$state$course.authors,
          language = _this$state$course.language,
          profits = _this$state$course.profits,
          courseReviews = _this$state$course.courseReviews;
      var _this$state2 = this.state,
          isLoading = _this$state2.isLoading,
          showReviewsNum = _this$state2.showReviewsNum,
          error = _this$state2.error;
      var translate = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("main", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.coursePageDetailsWrapper
      }, isLoading ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_13__["Spinner"], null) : error ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.error
      }, error.message) : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h2", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.courseTitle
      }, courseName), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.shortDescription
      }, description), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.courseStats
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.stars
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_star_ratings__WEBPACK_IMPORTED_MODULE_10___default.a, {
        rating: rating,
        starRatedColor: "#ff8c05",
        starEmptyColor: "#515151",
        starDimension: "24px",
        starSpacing: "3px",
        numberOfStars: 5,
        name: "courseRating"
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, rating), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.verticalLine
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("font", null, translate('Students'), ": "), numberOfEnrolledStudents)), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("font", null, translate('Author'), ": "), authors), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.verticalLine
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("font", null, translate('Language'), ": "), language)), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.profitTitle
      }, translate('Your profits')), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("ul", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.profitList
      }, profits.map(function (profit) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("li", {
          key: profit.id
        }, profit.description);
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.reviewsTitle
      }, translate('Reviews')), courseReviews.slice(0, showReviewsNum).map(function (review, key) {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.reviewWrapper,
          key: key
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, review.user.userName), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.stars
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_star_ratings__WEBPACK_IMPORTED_MODULE_10___default.a, {
          rating: review.rating,
          starRatedColor: "#ff8c05",
          starEmptyColor: "#515151",
          starDimension: "24px",
          starSpacing: "3px",
          numberOfStars: 5,
          name: "review".concat(review.key)
        })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, review.createdAt)), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, review.text));
      }), courseReviews.length > showReviewsNum && react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.buttonWrapper
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_14___default.a.showMoreButton,
        type: "button",
        onClick: this.showMoreReviews
      }, translate('Show more reviews')))));
    }
  }]);

  return coursePageDetails;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_11__["withTranslation"])('translations')(coursePageDetails));

/***/ }),

/***/ "./src/containers/coursePageDetails/styles.module.scss":
/*!*************************************************************!*\
  !*** ./src/containers/coursePageDetails/styles.module.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/coursePageDetails/styles.module.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/coursePageDetails/styles.module.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../node_modules/sass-loader/lib/loader.js!./styles.module.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./src/containers/coursePageDetails/styles.module.scss");

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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../actions/auth */ "./src/actions/auth.js");
/* harmony import */ var _components_search__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/search */ "./src/components/search/index.js");
/* harmony import */ var _auth_login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../auth/login */ "./src/containers/auth/login/index.js");
/* harmony import */ var _auth_register__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../auth/register */ "./src/containers/auth/register/index.js");
/* harmony import */ var _auth_forgotPassword__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../auth/forgotPassword */ "./src/containers/auth/forgotPassword/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/header/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./menu.scss */ "./src/containers/header/menu.scss");
/* harmony import */ var _menu_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_menu_scss__WEBPACK_IMPORTED_MODULE_14__);
















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

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('en'),
      _useState12 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState11, 2),
      lang = _useState12[0],
      setLang = _useState12[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var handleWidth = function handleWidth() {
      return setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWidth);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (width > 992) {
      var toggleElement = document.querySelector('#menu');
      toggleElement.classList.remove('mobileMenuActive');
      setMenuStatus(false);
    }
  });

  var toggleMenuFunc = function toggleMenuFunc() {
    if (width <= 992) {
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

  var handleChange = function handleChange(event) {
    var newLang = event.target.value;
    setLang(newLang);
    props.i18n.changeLanguage(newLang);
  };

  var isAuthenticated = props.isAuthenticated,
      logOutRequest = props.logOutRequest,
      translate = props.t;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.header
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.logoWrapper
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "DP"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "DasPish"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_search__WEBPACK_IMPORTED_MODULE_9__["default"], null), width < 992 && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.menuIcons,
    onClick: checkMobileMenuStatus
  }, !isOpenMenu ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaBars"], null) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaWindowClose"], null)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "menu",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.menu
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    onClick: checkMobileMenuStatus
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/catalogue",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.link
  }, translate('Catalogue'))), isAuthenticated ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.authButtonsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    onClick: checkMobileMenuStatus
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/profile-public",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.link
  }, translate('Account'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.button,
    onClick: logOutRequest
  }, translate('Log out')))) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.authButtonsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.button,
    onClick: openModalLog
  }, translate('Log In')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.button,
    onClick: openModalReg
  }, translate('Register'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
    name: "localization",
    onChange: handleChange
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    value: "en",
    defaultValue: true
  }, "ENG"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    value: "ru"
  }, "RUS"))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_login__WEBPACK_IMPORTED_MODULE_10__["default"], {
    modalStatus: isOpenLog,
    onModalClose: closeLoginModal,
    modalStatusForgotPass: isOpenForgotPass,
    onModalCloseForgotPass: setModalForgotPass
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_register__WEBPACK_IMPORTED_MODULE_11__["default"], {
    modalStatus: isOpenReg,
    onModalClose: closeRegModal,
    onModalCloseLog: setModalStatusLog
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_auth_forgotPassword__WEBPACK_IMPORTED_MODULE_12__["default"], {
    modalStatus: isOpenForgotPass,
    onModalClose: setModalForgotPass
  }), width < 992 && isOpenMenu && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.outSideMenuClick,
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
  logOutRequest: _actions_auth__WEBPACK_IMPORTED_MODULE_8__["logOutRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Object(react_i18next__WEBPACK_IMPORTED_MODULE_7__["withTranslation"])('translations')(Header)));

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

/***/ "./src/containers/mainPage/dotsStyles.scss":
/*!*************************************************!*\
  !*** ./src/containers/mainPage/dotsStyles.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./dotsStyles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/dotsStyles.scss");

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
      /*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./dotsStyles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/dotsStyles.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!./dotsStyles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/containers/mainPage/dotsStyles.scss");

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
/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-alice-carousel */ "./node_modules/react-alice-carousel/lib/react-alice-carousel.js");
/* harmony import */ var react_alice_carousel__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _components_socials__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/socials */ "./src/components/socials/index.jsx");
/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-alice-carousel/lib/alice-carousel.css */ "./node_modules/react-alice-carousel/lib/alice-carousel.css");
/* harmony import */ var react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_alice_carousel_lib_alice_carousel_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/mainPage/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _dotsStyles_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dotsStyles.scss */ "./src/containers/mainPage/dotsStyles.scss");
/* harmony import */ var _dotsStyles_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_dotsStyles_scss__WEBPACK_IMPORTED_MODULE_14__);
















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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "sliderItems", function () {
      var translate = _this.props.t;
      var slides = [{
        header: "".concat(translate('Learn ! Potom DasPish !')),
        description: "".concat(translate("We are learning the whole world ! If don't believe us you don't believe nobody."))
      }, {
        header: "".concat(translate('Lorem ipsum dolor sit amet consectetur adipisicing.')),
        description: "".concat(translate('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum nobis similique delectus? Dolor, ut aliquid..'))
      }, {
        header: "".concat(translate('Lorem, ipsum dolor.')),
        description: "".concat(translate('Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, incidunt eum sint maiores necessitatibus dolores laudantium quasi quas minus amet.'))
      }];
      return slides.map(function (item, key) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
          key: key,
          className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.slideContainer
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h1", null, item.header), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, item.description));
      });
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MainPage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("section", {
        className: "mainPageSlider ".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.mainPageWrapper)
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_socials__WEBPACK_IMPORTED_MODULE_11__["default"], null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_13___default.a.slider
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_alice_carousel__WEBPACK_IMPORTED_MODULE_9___default.a, {
        items: this.sliderItems(),
        mouseDragEnabled: false,
        autoPlay: true,
        autoPlayInterval: 5000,
        infinite: true,
        buttonsDisabled: true,
        ref: function ref(el) {
          return _this2.Carousel = el;
        }
      })));
    }
  }]);

  return MainPage;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Object(react_i18next__WEBPACK_IMPORTED_MODULE_10__["withTranslation"])('translations')(MainPage)));

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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
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
      email: '',
      password: '',
      errors: {}
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onSubmit", function (e) {
      e.preventDefault();
      var _this$state = _this.state,
          email = _this$state.email,
          password = _this$state.password;
      var errors = Object(_validation_auth__WEBPACK_IMPORTED_MODULE_10__["changeAccountValidate"])(email, password);

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(errors)) {
        _this.setState({
          errors: errors
        });
      } else {
        _this.setState({
          email: '',
          password: '',
          errors: {}
        });

        Object(_services_auth__WEBPACK_IMPORTED_MODULE_11__["changeAccountData"])({
          email: email,
          password: password
        });
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onChange", function (e) {
      _this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({}, e.target.name, e.target.value));
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Account, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          password = _this$state2.password,
          email = _this$state2.email,
          errors = _this$state2.errors;
      var translate = this.props.t;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.accountWrapper
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.onSubmit
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.password
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "text",
        id: "email",
        name: "email",
        value: email,
        placeholder: "Email",
        onChange: this.onChange
      }), errors.email && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
      }, errors.email)), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.password
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "password",
        id: "password",
        name: "password",
        value: password,
        placeholder: "".concat(translate('Password')),
        onChange: this.onChange
      }), errors.password && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
      }, errors.password)), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.buttonWrapper
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "submit"
      }, "".concat(translate('Save')))))));
    }
  }]);

  return Account;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_9__["withTranslation"])('translations')(Account));

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

/***/ "./src/containers/profile/index.jsx":
/*!******************************************!*\
  !*** ./src/containers/profile/index.jsx ***!
  \******************************************/
/*! exports provided: ProfileRouters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileRouters", function() { return ProfileRouters; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_privateRoute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/privateRoute */ "./src/components/privateRoute/index.js");
/* harmony import */ var _profile_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile/index */ "./src/containers/profile/profile/index.jsx");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./account */ "./src/containers/profile/account/index.jsx");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile */ "./src/containers/profile/profile.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_6__);







var ProfileRouters = function ProfileRouters() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.profileWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_profile__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.publicWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_privateRoute__WEBPACK_IMPORTED_MODULE_2__["PrivateRoute"], {
    path: "/profile-public",
    component: _profile_index__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_privateRoute__WEBPACK_IMPORTED_MODULE_2__["PrivateRoute"], {
    path: "/profile-account",
    component: _account__WEBPACK_IMPORTED_MODULE_4__["default"]
  })))));
};

/***/ }),

/***/ "./src/containers/profile/profile.js":
/*!*******************************************!*\
  !*** ./src/containers/profile/profile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3__);





var Profile = function Profile(props) {
  var currentTab = window.location.pathname;
  var tabs = {
    "public": '/profile-public',
    account: '/profile-account'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.navWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-public"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs["public"] ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "".concat(props.t('Profile'))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile-account"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "".concat(_styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.button, " ").concat(currentTab === tabs.account ? _styles_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.activeButton : '')
  }, "".concat(props.t('Account'))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_i18next__WEBPACK_IMPORTED_MODULE_2__["withTranslation"])('translations')(Profile));

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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _validation_profile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../validation/profile */ "./src/validation/profile.js");
/* harmony import */ var _actions_profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../actions/profile */ "./src/actions/profile.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _components_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/spinner */ "./src/components/spinner/index.js");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles.module.scss */ "./src/containers/profile/profile/styles.module.scss");
/* harmony import */ var _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_module_scss__WEBPACK_IMPORTED_MODULE_12__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }












var ProfileData = function ProfileData(_ref) {
  var profile = _ref.profile,
      getProfileRequest = _ref.getProfileRequest,
      updateProfileRequest = _ref.updateProfileRequest,
      isProfileLoading = _ref.isProfileLoading,
      translate = _ref.t;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    userName: '',
    description: '',
    twitterLink: '',
    facebookLink: '',
    linkedInLink: ''
  }),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    userName: '',
    description: '',
    twitterLink: '',
    facebookLink: '',
    linkedInLink: ''
  }),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  var userName = formData.userName,
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
    var errors = Object(_validation_profile__WEBPACK_IMPORTED_MODULE_8__["publicProfileValidate"])(formData);

    if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_2___default()(errors)) {
      setErrors(errors);
    } else {
      setErrors({});
      updateProfileRequest(formData);
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, isProfileLoading ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_spinner__WEBPACK_IMPORTED_MODULE_11__["Spinner"], null) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("form", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.profileWrapper,
    onSubmit: onSubmit,
    noValidate: true
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.userFullName
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "text",
    name: "userName",
    value: userName,
    placeholder: "".concat(translate('Username')),
    onChange: onChange
  }), errors.userName && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.userName))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.description
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("textarea", {
    type: "text",
    rows: "4",
    name: "description",
    value: description,
    placeholder: "".concat(translate('Description')),
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
    placeholder: _utils_constants__WEBPACK_IMPORTED_MODULE_10__["links"].twitter,
    onChange: onChange
  }), errors.twitterLink && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.twitterLink)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaFacebookF"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.facebookIcon
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "url",
    name: "facebookLink",
    value: facebookLink,
    placeholder: _utils_constants__WEBPACK_IMPORTED_MODULE_10__["links"].facebook,
    onChange: onChange
  }), errors.facebookLink && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.facebookLink)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_6__["FaLinkedinIn"], {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.linkedinIcon
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
    type: "url",
    name: "linkedInLink",
    value: linkedInLink,
    placeholder: _utils_constants__WEBPACK_IMPORTED_MODULE_10__["links"].linkedIn,
    onChange: onChange
  }), errors.linkedInLink && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.invalidFeedback
  }, errors.linkedInLink)))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: _styles_module_scss__WEBPACK_IMPORTED_MODULE_12___default.a.buttonsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", {
    type: "submit"
  }, "".concat(translate('Save'))))));
};

ProfileData.propTypes = {
  getProfileRequest: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired,
  updateProfileRequest: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func.isRequired,
  isProfileLoading: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    profile: state.user.profile,
    isProfileLoading: state.user.isProfileLoading
  };
};

var mapDispatchToProps = {
  getProfileRequest: _actions_profile__WEBPACK_IMPORTED_MODULE_9__["getProfileRequest"],
  updateProfileRequest: _actions_profile__WEBPACK_IMPORTED_MODULE_9__["updateProfileRequest"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(Object(react_i18next__WEBPACK_IMPORTED_MODULE_7__["withTranslation"])('translations')(ProfileData)));

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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../i18n */ "./i18n.js");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(normalize_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scss/base.scss */ "./src/scss/base.scss");
/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_scss_base_scss__WEBPACK_IMPORTED_MODULE_9__);










var store = Object(_store_index__WEBPACK_IMPORTED_MODULE_4__["configureStore"])();
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
  store: store
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_i18next__WEBPACK_IMPORTED_MODULE_5__["I18nextProvider"], {
  i18n: _i18n__WEBPACK_IMPORTED_MODULE_6__["default"]
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_app__WEBPACK_IMPORTED_MODULE_3__["default"], null))), document.getElementById('root'));

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
  data: null,
  profile: null,
  isProfileLoading: true
};

var loginSuccess = function loginSuccess(state, _ref) {
  var payload = _ref.payload;
  return _objectSpread({}, state, {
    isAuthenticated: true,
    data: payload
  });
};

var loginFailure = function loginFailure(state) {
  return _objectSpread({}, state, {
    isAuthenticated: false
  });
};

var logOutSuccess = function logOutSuccess(state) {
  return _objectSpread({}, state, {
    isAuthenticated: false,
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

/***/ "./src/services/auth.js":
/*!******************************!*\
  !*** ./src/services/auth.js ***!
  \******************************/
/*! exports provided: socialLoginRequest, registerRequest, loginRequest, logOutRequest, changeAccountData, forgotPasswordRequest, resetPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "socialLoginRequest", function() { return socialLoginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerRequest", function() { return registerRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRequest", function() { return loginRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOutRequest", function() { return logOutRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeAccountData", function() { return changeAccountData; });
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
var changeAccountData =
/*#__PURE__*/
function () {
  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(data) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            config.headers.Authorization = localStorage.token;
            _context3.next = 4;
            return _httpService__WEBPACK_IMPORTED_MODULE_4__["httpService"].put({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_6__["links"].changePasswordRoute,
              data: data,
              config: config
            });

          case 4:
            response = _context3.sent;
            _storageService__WEBPACK_IMPORTED_MODULE_5__["storageWrapper"].setToken(response.data.token);
            return _context3.abrupt("return", response);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0.response.data;

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function changeAccountData(_x3) {
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

/***/ "./src/services/course.js":
/*!********************************!*\
  !*** ./src/services/course.js ***!
  \********************************/
/*! exports provided: getCourseDetails, getCoursesForCarousel, getCoursesByAttribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCourseDetails", function() { return getCourseDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoursesForCarousel", function() { return getCoursesForCarousel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoursesByAttribute", function() { return getCoursesByAttribute; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _httpService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./httpService */ "./src/services/httpService.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");




var config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
var getCourseDetails =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(id) {
    var response, course;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = {};
            _context.prev = 1;
            _context.next = 4;
            return _httpService__WEBPACK_IMPORTED_MODULE_2__["httpService"].get({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_3__["links"].coursePreviewRoute + id,
              config: config
            });

          case 4:
            course = _context.sent;
            response = {
              error: false,
              data: course.data
            };
            return _context.abrupt("return", response);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            response = {
              error: true,
              data: _context.t0.response.data
            };
            return _context.abrupt("return", response);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function getCourseDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getCoursesForCarousel =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var _ref3, data;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _httpService__WEBPACK_IMPORTED_MODULE_2__["httpService"].get({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_3__["links"].coursesCarouselRoute,
              config: config
            });

          case 2:
            _ref3 = _context2.sent;
            data = _ref3.data;
            return _context2.abrupt("return", data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCoursesForCarousel() {
    return _ref2.apply(this, arguments);
  };
}();
var getCoursesByAttribute =
/*#__PURE__*/
function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(search, limit) {
    var _ref5, data;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _httpService__WEBPACK_IMPORTED_MODULE_2__["httpService"].get({
              url: _utils_constants__WEBPACK_IMPORTED_MODULE_3__["links"].searchCourses,
              config: config,
              params: {
                search: search,
                limit: limit
              }
            });

          case 2:
            _ref5 = _context3.sent;
            data = _ref5.data;
            return _context3.abrupt("return", data.data);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCoursesByAttribute(_x2, _x3) {
    return _ref4.apply(this, arguments);
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
  coursesCarouselRoute: 'course/carousel',
  searchCourses: 'course',
  coursePreviewRoute: 'course/preview/',
  twitter: 'http://twitter.com/',
  facebook: 'https://www.facebook.com/',
  linkedIn: 'https://www.linkedin.com/',
  coursePreview: 'course/preview/',
  placeHolderImage: 'http://placeimg.com/640/480/tech'
};

/***/ }),

/***/ "./src/utils/toast.js":
/*!****************************!*\
  !*** ./src/utils/toast.js ***!
  \****************************/
/*! exports provided: showToast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToast", function() { return showToast; });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");

var showToast = function showToast(type, message) {
  var options = {
    autoClose: 2000,
    position: react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].POSITION.TOP_RIGHT,
    hideProgressBar: false,
    className: 'toastifyMessage'
  };

  if (type === 'success') {
    react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].success(message, options);
    return;
  }

  react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(message, options);
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
/*! exports provided: userNameSchema, loginValidate, registerValidate, changePasswordValidate, changeAccountValidate, emailValidate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userNameSchema", function() { return userNameSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginValidate", function() { return loginValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerValidate", function() { return registerValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePasswordValidate", function() { return changePasswordValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeAccountValidate", function() { return changeAccountValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailValidate", function() { return emailValidate; });
/* harmony import */ var joi_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi-browser */ "./node_modules/joi-browser/dist/joi-browser.js");
/* harmony import */ var joi_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi_browser__WEBPACK_IMPORTED_MODULE_0__);

var passwordRegex = /^(?=.*?[A-Z-А-Я])(?=.*?[\?\$\^\*#!@%&-])/;
var userNameSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(2).max(20).required();
var emailSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().email().max(64);
var passwordSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().regex(passwordRegex).min(8).max(32);
var passwordConfirmSchema = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({
  password: joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.string().required().regex(passwordRegex).min(8).max(32),
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

    if (errors.password.includes("".concat(passwordRegex))) {
      errors.password = 'Password must contain at least one uppercase letter and one special symbol';
    }
  }

  return errors;
};
var registerValidate = function registerValidate(userName, email, password, confirmPassword) {
  var errors = {};
  var userNameValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(userName, userNameSchema);
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

    if (errors.password.includes("".concat(passwordRegex))) {
      errors.password = 'Password must contain at least one uppercase letter and one special symbol';
    }
  }

  if (userNameValidate.error) {
    errors.userName = userNameValidate.error.details[0].message.replace('"value"', 'Username');
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

    if (errors.password.includes("".concat(passwordRegex))) {
      errors.password = 'Password must contain at least one uppercase letter and one special symbol';
    }
  }

  return errors;
};
var changeAccountValidate = function changeAccountValidate(email, password) {
  var errors = {};
  var emailValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(email, emailSchema);
  var passwordValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(password, passwordSchema);

  if (emailValidate.error) {
    errors.email = emailValidate.error.details[0].message.replace('"value"', 'Email');
  }

  if (passwordValidate.error) {
    errors.password = passwordValidate.error.details[0].message.replace('"value"', 'Password');

    if (errors.password.includes("".concat(passwordRegex))) {
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
  var userName = profile.userName,
      description = profile.description,
      twitterLink = profile.twitterLink,
      facebookLink = profile.facebookLink,
      linkedInLink = profile.linkedInLink;
  var userNameValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(userName, _auth__WEBPACK_IMPORTED_MODULE_1__["userNameSchema"]);
  var descriptionValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(description, descriptionSchema);
  var twitterLinkValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(twitterLink, socialSchema);
  var facebookLinkValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(facebookLink, socialSchema);
  var linkedInLinkValidate = joi_browser__WEBPACK_IMPORTED_MODULE_0___default.a.validate(linkedInLink, socialSchema);

  if (userNameValidate.error) {
    errors.firstName = userNameValidate.error.details[0].message.replace('"value"', 'Username');
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