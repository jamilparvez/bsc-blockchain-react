// Moralis.initialize("FxqrFfgWMSIa3UtRRtREhs4532M1p1dJLdmT66Vm"); //Application ID
// Moralis.serverURL ="https://uhm1wlcybkgb.usemoralis.com:2053/server"; //Server URL

/* Moralis init code */
const serverUrl = "https://uhm1wlcybkgb.usemoralis.com:2053/server";
const appId = "FxqrFfgWMSIa3UtRRtREhs4532M1p1dJLdmT66Vm";
Moralis.start({ serverUrl, appId });

/* Authentication code */
// async function login() {
//   let user = Moralis.User.current();
//   if (!user) {
//       user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
//       .then(function (user) {
//           console.log("logged in user:", user);
//           console.log(user.get("ethAddress"));
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//         // alert('helllo')
//   }
// }

const chainToQuery = 'bsc testnet'

async function login(){
    
    Moralis.Web3.authenticate().then(function (user){
        user.set("name", document.getElementById("username").value);
        user.set('email', document.getElementById('email').value);
        user.save();
        deactivateControls(); 
        populate();
    })
    // alert('helllo')
}

function deactivateControls(){
    document.getElementById("btn-login").setAttribute("disabled", null)
    document.getElementById("username").setAttribute("disabled", null)
    document.getElementById("email").setAttribute("disabled", null)
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

async function populate() {
    const balances = await Moralis.Web3API.account.getTokenBalances({chain: chainToQuery}).then(buildTableBalances);
}

function buildTableBalances(data){ 
    document.getElementById("resultBalances").innerHTML = `<table class="table table-dark table-striped" id="balancesTable">
                                                        </table>`;
    const table = document.getElementById("balancesTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Token</th>
                                <th>Symbol</th>
                                <th>Balance</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    console.log("data : " + data)
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].symbol}</td>
                        <td>${data[i].balance/10**18}</td>
                    </tr>`
        table.innerHTML += row;
    }
}