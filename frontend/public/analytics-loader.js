(function () {
  function loadAnalytics() {
    var emergent = document.createElement("script");
    emergent.src = "https://assets.emergent.sh/scripts/emergent-main.js";
    emergent.defer = true;
    emergent.async = true;
    document.body.appendChild(emergent);

    !(function (t, e) {
      var o, n, p, r;
      if (e.__SV) return;

      window.posthog = e;
      e._i = [];
      e.init = function (i, s, a) {
        function g(target, methodName) {
          var split = methodName.split(".");
          if (split.length === 2) {
            target = target[split[0]];
            methodName = split[1];
          }
          target[methodName] = function () {
            target.push([methodName].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }

        p = t.createElement("script");
        p.type = "text/javascript";
        p.crossOrigin = "anonymous";
        p.async = true;
        p.defer = true;
        p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";
        r = t.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(p, r);

        var u = a !== undefined ? (e[a] = []) : e;
        a = a || "posthog";
        u.people = u.people || [];
        u.toString = function (stub) {
          var name = "posthog";
          if (a !== "posthog") name += "." + a;
          if (!stub) name += " (stub)";
          return name;
        };
        u.people.toString = function () {
          return u.toString(1) + ".people (stub)";
        };

        o = "init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(" ");
        for (n = 0; n < o.length; n += 1) g(u, o[n]);
        e._i.push([i, s, a]);
      };
      e.__SV = 1;
    })(document, window.posthog || []);

    window.posthog.init("phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs", {
      api_host: "https://us.i.posthog.com",
      person_profiles: "identified_only",
      disable_session_recording: true,
      disable_surveys: true,
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      advanced_disable_decide: false,
    });
  }

  if (window.requestIdleCallback) window.requestIdleCallback(loadAnalytics);
  else setTimeout(loadAnalytics, 1);
})();
