//global variables
button_id = [
				["", "%", "CE", "c", "←", "/"], 
				["A", "B", "7", "8", "9", "*"],
				["C", "D", "4", "5", "6", "-"],
				["E", "F", "1", "2", "3", "+"],
				["", "", "±", "0", "", "="]
			];
result_id = {"HEX": 16, "DEC": 10, "OCT": 8, "BIN": 2};
mode_id = {"HEX_mode": 16, "DEC_mode": 10, "OCT_mode": 8, "BIN_mode": 2};
base = 10;
display_formula = "", real_formula = "", number ="0";
//functions
function update_result()
{
	var ans, flag = false;
	if(number[0]=="-")
	{
		if(number.length>=2)
			ans = number;
		else
		{
			ans = "0";
			flag = true;
		}
	}
	else
		ans = number;
	
	ans = parseInt(ans, base);
	
	var result = document.getElementById("formula");
	result.innerHTML = display_formula;
	result = document.getElementById("result");
	if(flag)
	{
		result.innerHTML = "-";
	}
	else
	{
		if(base==10)
			result.innerHTML = (ans).toString(base);
		else	
			result.innerHTML = (ans&0xffff).toString(base);
	}
	
	for(var key in result_id)
	{
		if(result_id[key]==10)
		{
			result = document.getElementById(key);
			result.innerHTML = (ans).toString(result_id[key]);
		}
		else
		{
			result = document.getElementById(key);
			result.innerHTML = (ans&0xffff).toString(result_id[key]);
		}
	}
}

function change_mode(m_id)
{
	var i;
	for(i in mode_id)
	{
		document.getElementById(i).style.color = "black";
	}
	document.getElementById(m_id).style.color = "blue";
	
	number = parseInt(number, base).toString(mode_id[m_id]);
	base = mode_id[m_id];
	
	for(i=0; i<base; i++)
	{
		document.getElementById(i.toString(16).toUpperCase()).disabled = false;
		document.getElementById(i.toString(16).toUpperCase()).style.color = "black";
	}
	for(i=base; i<16; i++)
	{
		document.getElementById(i.toString(16).toUpperCase()).disabled = true;
		document.getElementById(i.toString(16).toUpperCase()).style.color = "grey";
	}
	
	update_result();
}

function number_string(num)
{
	var flag = false;
	if(num[0]=="-")
	{
		flag = true;
		num = num.substring(1, num.length);
	}
	switch(base)
	{
		case 16:
			num = "0x" + num;
			break;
		case 10:
			num = num;
			break;
		case 8:
			num = "0o" + num;
			break;
		case 2:
			num = "0b" + num;
			break;
		default:
			alert("base is error");
	}
	if(flag)
		num = "-" + num;
	
	return num;
}

function press_button(button_value)
{
	if(button_value=="c")
	{
		display_formula = "";
		real_formula = "";
		number = "0";
	}
	else if(button_value=="CE")
	{
		number = "0";
	}
	else if(button_value=="=")
	{
		if(number[0]=="-")
		{
			if(number.length>=2)
			{
				real_formula = real_formula.concat(number_string(number));
			}
			else
			{
				real_formula = real_formula.substring(0, length-1);
			}
		}
		else
		{
			real_formula = real_formula.concat(number_string(number));
		}
		
		console.log(real_formula);
		number = eval(real_formula).toString(base);
		display_formula = "";
		real_formula = "";
	}
	else if(button_value=="←")
	{
		number = number.substring(0, number.length-1);
		if(number.length==0)
			number = "0";
	}
	else if(button_value=="±")
	{
	}
	else if(button_value=="+" || button_value=="-" || button_value=="*" || button_value=="/" || button_value=="%")
	{
		if(display_formula=="" && number=="0")
		{
			display_formula = "0" + button_value;
			real_formula = "0" + button_value;
		}
		else
		{
			if(number=="0")
			{
				if(button_value=="-")
					number = "-";
			}
			else if(number.length==1 && number[0]=="-")
			{
				//number = "-"
			}
			else
			{
				display_formula = display_formula.concat(number);
				real_formula = real_formula.concat(number_string(number));
				display_formula = display_formula.concat(button_value);
				real_formula = real_formula.concat(button_value);
				number = "0";
			}
		}
	}
	else
	{
		if(number=="0")
			number = button_value;
		else
			number = number.concat(button_value);
	}
	update_result()
}

function initialize()
{
	change_mode("DEC_mode");
	var i, j, tmp;
	for(i in mode_id)
	{
		document.getElementById(i).onclick = function(){ change_mode(this.id) };
	}
	for(i=0; i<5; i++)
	{
		for(j=0; j<6; j++)
		{
			tmp = document.getElementById(button_id[i][j]);
			if(tmp!=null)
			{
				tmp.onclick = function(){ press_button(this.id) };
			}
		}
	}
}

var tmp = document.getElementById("main");
tmp.onload = function(){ initialize() };