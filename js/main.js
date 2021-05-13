var s2k_Input = document.getElementById("s2k_Input");
let s2k_Btn = document.getElementById("s2k_Btn");
var s2k_Main = document.getElementsByClassName("main")[0];
s2k_Input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("s2k_Btn").click();
    }
});
var s2k_query = {
    get: function() {
        let ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        let s2k_txt = `<span>IP: `;
        let s2k_parts = s2k_Input.value.split(":");
        let s2k_ip = s2k_parts[0];
        if (s2k_ip.match(ipformat)) {
            s2k_txt += `${s2k_ip}<br>Port: `;
            let s2k_port = 25565;
            if (typeof s2k_parts[1] !== 'undefined') {
                s2k_port = s2k_parts[1];
                s2k_txt += `${s2k_port}<br>`;
            } else {
                s2k_txt += `${s2k_port} (default port)<br>`;
            }
            s2k_Main.innerHTML = `Getting server status of ${s2k_ip}:${s2k_port}`;
            s2k_txt += `Server is: <span id="s2k-server-status">`
            MinecraftAPI.getServerStatus(s2k_ip, {
                port: s2k_port,
            }, function (s2k_err, s2k_status) {
                if (s2k_err) {
                    return document.querySelector('.main').innerHTML = `<span>Error loading status of server at IP: ${s2k_ip}:${s2k_port}<br>
                                                                        They server may not run or unreachable !
                                                                        </span>`;
                }
                let s2k_txt_error = ``;
                if (s2k_status.error != null) {
                    s2k_txt_error = `Error: ${s2k_status.error}<br>`;
                }
                s2k_txt += `${s2k_status.online ? 'Online !' : 'DOWN !'}</span></span><br>`;
                s2k_txt += `Message of the day: ${s2k_status.motd}<br>
                            Maximum online players: ${s2k_status.players.max}<br>
                            Current online players: ${s2k_status.players.now}<br>
                            Server version: ${s2k_status.server.name}<br>
                            Server protocol: ${s2k_status.server.protocol}<br>
                            Last updated: ${s2k_status.last_updated}<br>
                            Last Online: ${s2k_status.last_online}<br>
                            Duration: ${s2k_status.duration}<br>
                            ${s2k_txt_error}`
                document.querySelector('.main').innerHTML = s2k_txt;
            });
         } else {
            s2k_Main.innerHTML = `<span>Helytelen IP címet adtál meg !<span><br><span>Helyes IP cím például: 89.148.79.162</span><br>Vagy ha a portot is meg akarod határozni: 89.148.79.162:25565`;
        }
    },
}
