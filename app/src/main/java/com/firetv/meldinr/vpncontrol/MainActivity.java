package com.firetv.meldinr.vpncontrol;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class MainActivity extends AppCompatActivity {

    private Properties properties;

    private void loadProperties() {
        properties = new Properties();

        try {
            InputStream stream = getAssets().open("router.properties");
            properties.load(stream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        loadProperties();

        final Button refreshButton = (Button) findViewById(R.id.refreshButton);
        final Button localConnectButton = (Button) findViewById(R.id.localConnectbutton);
        final Button israelConnectButton = (Button) findViewById(R.id.israelConnectButton);
        final Button disconnectButton = (Button) findViewById(R.id.disconnectButton);
        final TextView textView = (TextView) findViewById(R.id.textView);
        final IspChecker checker = new IspChecker(getApplicationContext());
        final RouterController router = new RouterController(getApplicationContext(), properties.getProperty("router.ip"), properties.getProperty("router.username"), properties.getProperty("router.password"));
        final IspChecker.Callback ispCheckerCallback = new IspChecker.Callback() {
            @Override
            public void onResponse(String isp) {
                textView.setText("Your ISP is: "+ isp);
            }

            @Override
            public void onError(String error) {
                textView.setText("Error: "+ error);
            }
        };
        final RouterController.Callback disconnectCallback = new RouterController.Callback() {
            @Override
            public void onResponse(String isp) {
                textView.setText("VPN Disconnecting...");
            }

            @Override
            public void onError(String error) {
                textView.setText("Error: "+ error);
            }
        };
        final RouterController.Callback connectCallback = new RouterController.Callback() {
            @Override
            public void onResponse(String isp) {
                textView.setText("VPN Connecting...");
            }

            @Override
            public void onError(String error) {
                textView.setText("Error: "+ error);
            }
        };

        refreshButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textView.setText("Checking your ISP...");
                checker.getIsp(ispCheckerCallback);
            }
        });
        localConnectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textView.setText("VPN Connecting...");
                router.vpnConnect(
                        properties.getProperty("router.vpn.local.server"),
                        properties.getProperty("router.vpn.local.username"),
                        properties.getProperty("router.vpn.local.password"),
                        properties.getProperty("router.vpn.local.protocol"),
                        properties.getProperty("router.vpn.local.type"),
                        properties.getProperty("router.vpn.local.autoConnect"),
                        connectCallback
                );
            }
        });
        israelConnectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textView.setText("VPN Connecting...");
                router.vpnConnect(
                        properties.getProperty("router.vpn.israel.server"),
                        properties.getProperty("router.vpn.israel.username"),
                        properties.getProperty("router.vpn.israel.password"),
                        properties.getProperty("router.vpn.israel.protocol"),
                        properties.getProperty("router.vpn.israel.type"),
                        properties.getProperty("router.vpn.israel.autoConnect"),
                        connectCallback
                );            }
        });
        disconnectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textView.setText("Disconnecting VPN...");
                router.vpnDisconnect(disconnectCallback);
            }
        });

        checker.getIsp(ispCheckerCallback);
    }
}
