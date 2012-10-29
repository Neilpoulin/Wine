package lka.wine.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import lka.wine.dao.Brand;

public class BrandsTable extends AbstractTable<Brand> {

	private final static String tableName = "Brands";
	private final static List<String> columnNames = Arrays.asList("BrandID", "BrandName");

	@Override
	public Brand getObject(ResultSet rs) throws SQLException {
		Brand brand = new Brand();	
		brand.setBrandId(rs.getInt("BrandID"));
		brand.setBrandName(rs.getString("BrandName"));
		return brand;
	}

	@Override
	public String getTableName() {
		return tableName;
	}

	@Override
	public String getIdColumnName() {
		return columnNames.get(0);
	}

	@Override
	public List<String> getColumnNames() {
		return columnNames;
	}

}