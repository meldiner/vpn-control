package com.firetv.meldinr.vpncontrol;

import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by meldinr on 3/18/17.
 */

public class IspChecker {
    public interface Callback {
        void onResponse(String isp);
        void onError(String error);
    }

    private final String url = "https://www.whoismyisp.org";
    private RequestQueue queue;

    public IspChecker(Context context) {
        this.queue = Volley.newRequestQueue(context);
    }

    public void getIsp(final Callback cb) {
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url + "?currenttime=" + System.currentTimeMillis(),
            new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    cb.onResponse(parseIsp(response));
                }
            },
            new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    cb.onError(error.getMessage());
                }
            }
        ){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("Cache-Control", "no-cache");
                return params;
            }
        };

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
    }

    private String parseIsp(String response) {
        final String key = "<p>Your Internet Service Provider (ISP) is";
        String str = response.substring(response.indexOf(key));
        str = str.replace(key, "");
        str = str.substring(0, str.indexOf("."));
        return str;
    }
}
