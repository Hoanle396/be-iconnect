pragma solidity ^0.8.4;


contract Contract{
   unit256 data;  
   
   function store(unit256 data)public {
      data=data;
   }                          

   function retrieve() public view returns (uint256){
      return data;
   } 
}