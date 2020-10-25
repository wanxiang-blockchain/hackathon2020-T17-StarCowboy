include "../node_modules/circomlib/circuits/comparators.circom";
template IntervalRange(){
    signal input publicRange[2]; 
    signal private input inputValue;
    signal output out; 
    component gt1 = GreaterEqThan(20);
    gt1.in[0] <== inputValue;
    gt1.in[1] <== publicRange[0];
    gt1.out === 1; 
    component lt1 = LessEqThan(20);
    lt1.in[0] <== inputValue;
    lt1.in[1] <== publicRange[1];
    lt1.out === 1;
    out <-- (gt1.out + lt1.out )/2;
    out === 1;
}
component main = IntervalRange();