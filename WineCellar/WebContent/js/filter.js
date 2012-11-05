function FilterManager($parent){
	this.$list = $parent;
	this.filters = {
			inStock: new Filter(false, "li:not(:has(p[class='inStock']))", $parent, "hide"),
			vineyards: new Filter(true, "li.none", $parent, "show")
	};
}

FilterManager.prototype.applyAll = function(){
	this.$list.find("li").hide();
	var enabled = false;
	for (key in this.filters){		
		var filter = this.filters[key];
		if (filter.type.toLowerCase() == "show"){			
			if (filter.enabled){
				filter.apply();
				enabled = true;
			}
		}		
	}
	for (key in this.filters){		
		var filter = this.filters[key];
		if (filter.type.toLowerCase() == "hide"){
			if (filter.enabled){
				filter.apply();
				enabled = true;
			}
		}
		
	}
	if (!enabled){
		this.$list.find("li").show();
	}
};

FilterManager.removeAll = function(){
	this.$list.find("li").show();
};

function removeAllFilters(){
	$("#wineSummaries li").show();
	
}

function Filter(setting, selector, $parent, type){
	 this.enabled = setting;
	 this.filter= [selector];
	 this.$list = $parent;
	 this.type = type;
}

Filter.prototype.addFilter = function(selector){
	this.filter.push(selector);
};

Filter.prototype.getResults = function(){
	var $result = $("");
	
	for (var i=0; i<this.filter.length; i++){
		$result = $result.add($(this.$list.find(this.filter[i])));
	}
	return $result;
};

Filter.prototype.reset = function(){
	this.filter = [];
};

Filter.prototype.setEnabled = function(enabled){
	this.enabled = enabled;
};

Filter.prototype.enable = function(){
	this.setEnabled(true);
};

Filter.prototype.disable = function(){
	this.setEnabled(false);
};


Filter.prototype.apply = function(){
	if(this.enabled){
		if (this.type.toLowerCase() == "hide"){
			this.getResults().hide();
		} else {
			this.getResults().show();
		}
		
	}else{
		if (this.type.toLowerCase() == "hide"){
			this.getResults().show();
			this.$list.animate({scrollTop: "0px"}, 500);
		} else {
			this.getResults().hide();
			this.$list.animate({scrollTop: "0px"}, 500);
		}
	}
};