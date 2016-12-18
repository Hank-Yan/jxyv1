<?php
/**
 * 获取周次
 * @param type $i
 * @return string
 */
function getWeekNum($i){
	if ($i>=1 && $i<=3) {
	  return '1--2';
	}else if($i>=4 && $i<=6) {
	  return '2--3';
	}else if($i>=7 && $i<=9) {
	  return '3--4';
	}else if($i>=10 && $i<=11) {
	  return '4--5';
	}else if($i>=12 && $i<=14) {
	  return '5--6';
	}else if($i>=15 && $i<=17) {
	  return '6--7';
	}else if($i>=18 && $i<=20) {
	  return '7--8';
	}else if($i>=21 && $i<=23) {
	  return '8--9';
	}else if($i>=24 && $i<=25) {
	  return '9--10';
	}else if($i>=26 && $i<=28) {
	  return '10--11';
	}else if($i>=29 && $i<=30) {
	  return '11--12';
	}else if($i>=31 && $i<=32) {
	  return '12--13';
	}else if($i>=33 && $i<=36) {
	  return '13--14';
	}else if($i>=37 && $i<=40) {
	  return '14--15';
	}else if($i>=41 && $i<=44) {
	  return '15--16';
	}else if($i>=45 && $i<=48) {
	  return '16--17';
	}else if($i>=49 && $i<=51) {
	  return '17--18';
	}else if($i>=52 && $i<=54) {
	  return '18--19';
	}else if($i>=55 && $i<=56) {
	  return '19--20';
	}else if($i>=57 && $i<=58) {
	  return '20--21';
	}else if($i>=59 && $i<=61) {
	  return '21--22';
	}else if($i>=62 && $i<=64) {
	  return '22--23';
	}else if($i>=65 && $i<=66) {
	  return '23--24';
	}else if($i>=67 && $i<=68) {
	  return '24--25';
	}else if($i>=69) {
	  return '25--26';
	}
}

