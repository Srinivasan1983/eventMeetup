pragma solidity ^0.4.7;

contract contractMeetup {
    string public name;
    string public place;
    string public extraInfo;
    uint public ticketPrice;
    address public hostName;
    address private supervisor;
    address public ownerAddress;
    uint256 public ticketSupply;
    uint public withDrawalDeadline;
    uint public startTime;
    uint public endTime;
    bool private confirmSignal;
    uint public msgsenderbalance;
    uint public hostnamebalance;
    uint256 public ticketwithdraw;
    mapping(address=>uint) public balanceOfTickets;
    mapping(address=>uint) public receivedAmount;
    enum State{OnSale,OnStage,Closed,Inactive,Cancel,Open}
    State public state;
    event MoneyTransfer();
    event TicketVerified(address buyer,bool istrue);
    event ConfirmEvent(bool isSignal);
    event startEvent(address senderaddress);
    event CancelEvent(address senderaddress, string stateName);
    event CloseEvent(string stateName);
    event Refund(uint refundAmount);




  function contractMeetup(
    string _name,string _place,uint _ticketPrice,address _hostName, uint _ticketSupply,
    uint timeBeforeRefundDeadline,uint timeBeforestartTime,
    uint timeBeforeeventendTime,address _supervisor, string _extraInfo)
{
    name = _name;
    place = _place;
    ticketPrice = _ticketPrice;
    ownerAddress = msg.sender;
    hostName = _hostName;
    supervisor = _supervisor;
    ticketSupply = _ticketSupply;
    withDrawalDeadline = now + timeBeforeRefundDeadline * 1 minutes;
    startTime = now + timeBeforestartTime * 1 minutes;
    endTime = now + timeBeforeeventendTime* 1 minutes;
    balanceOfTickets[hostName] = _ticketSupply;
    state = State.Open;
    extraInfo = _extraInfo;
}

modifier OnlyEventHost {
if (msg.sender != hostName){
  throw;
}else {
  _ ;
}
}

modifier atStage (State _state) {
        if(state != _state) throw;
        _;
}

modifier OnlySupervisor {
        if (msg.sender != supervisor) {throw;}
        else { _ ; }

}

modifier OnlyParticipants {
        if (msg.sender != supervisor) {throw;}
        else { _ ; }

}

function buyTicket(uint ticketwant) payable
    {
        if(state !=State.OnSale) throw;

        if (ticketSupply < ticketwant) throw;

        //if (msg.value != ticketwant*ticketPrice*1 ether) throw;

        ticketSupply-= ticketwant;
      balanceOfTickets[msg.sender]+=ticketwant;
    //  uint  msgsenderbalance = balanceOfTickets[msg.sender];
    //        msgsenderbalance = 0;
      //      msgsenderbalance+=ticketwant;
      balanceOfTickets[hostName]-=ticketwant;
  //    uint  hostnamebalance = balanceOfTickets[hostName];
  //          hostnamebalance-=ticketwant;
        MoneyTransfer();
}

function safeWithdraw(uint ticketwithdraw){
        if(msg.sender == hostName ||msg.sender == supervisor) throw;

        if (now > withDrawalDeadline) throw;//before Deadline

        if (ticketwithdraw >  balanceOfTickets[msg.sender]) throw;

        ticketSupply+= ticketwithdraw;
        balanceOfTickets[msg.sender]-=ticketwithdraw;
        balanceOfTickets[hostName]+=ticketwithdraw;

      // if(msg.sender.send(ticketwithdraw * ticketPrice * 1 ether))
          //  MoneyTransfer(this,ticketwithdraw * ticketPrice * 1 ether,true);
}



function StartEvent() atStage(State.OnSale){
        //if (now >= endTime) {
            state = State.OnStage;

      //  } else{
      //      throw;
      //  }
        startEvent(msg.sender);
}

function closeEvent() OnlyEventHost atStage(State.OnStage) {

        state = State.Closed;
        CloseEvent(name);
}

function cancelEvent () OnlyEventHost atStage(State.Open)
    {
        if(msg.sender != hostName) throw;
           state = State.Cancel;
           CancelEvent(msg.sender, name);

   }

function getIncome () OnlyEventHost {
   if (confirmSignal == true) {
   if (now>=endTime && state == State.Closed) {
        if(!msg.sender.send(this.balance)) throw;
    //   MoneyTransfer(msg.sender, this.balance, true);
       state = State.Inactive;
    }
  }
}

function confirmEvent (bool _confirm) OnlySupervisor atStage(State.Open) {
        if (now >= endTime) {
          throw;
        } else {
          confirmSignal = _confirm;
          state = State.OnSale;
        }
        if (confirmSignal == false) {
           state = State.Cancel;
      }
        ConfirmEvent (confirmSignal);
}

function ticketLeft() {
        if (now >= startTime && balanceOfTickets[msg.sender] >= 1 && state == State.OnStage&& msg.sender!= hostName){
            balanceOfTickets[msg.sender] -= 1;
            TicketVerified(msg.sender, true);
        } else {
            throw;
        }

}

function refundBalanceAmount()  {
    //if (msg.sender == hostName) {
    if (balanceOfTickets[msg.sender] != 0) {
    uint refundAmount = (balanceOfTickets[msg.sender] * ticketPrice * 1);
     receivedAmount[msg.sender] = 0;
      if(!msg.sender.send(refundAmount)) throw;
      //  msgsenderbalance=0;
      Refund(refundAmount);
          }
else {
    throw;
     }
//}
//else {
//    throw;
//}
}


}
