interface SaleTerm {
	id: string
	name: string
	value_id: string | null
	value_name: string
	value_struct: { number: number; unit: string } | null
	values: Array<{
		id: string | null
		name: string
		struct: { number: number; unit: string } | null
	}>
	value_type: string
}

interface Picture {
	id: string
	url: string
	secure_url: string
	size: string
	max_size: string
	quality: string
}

interface Attribute {
	id: string
	name: string
	value_id: string | null
	value_name: string
	value_struct: { number: number; unit: string } | null
	values: Array<{
		id: string | null
		name: string
		struct: { number: number; unit: string } | null
	}>
	attribute_group_id: string
	attribute_group_name: string
	value_type: string
}

interface SellerAddress {
	city: { name: string }
	state: { id: string; name: string }
	country: { id: string; name: string }
	id: number
}

interface Shipping {
	mode: string
	methods: any[]
	tags: string[]
	dimensions: any | null
	local_pick_up: boolean
	free_shipping: boolean
	logistic_type: string
	store_pick_up: boolean
}

export interface ItemData {
	id: string
	site_id: string
	title: string
	subtitle: string | null
	seller_id: number
	category_id: string
	official_store_id: string | null
	price: number
	base_price: number
	original_price: number | null
	currency_id: string
	initial_quantity: number
	available_quantity: number
	sold_quantity: number
	buying_mode: string
	listing_type_id: string
	start_time: string
	stop_time: string
	condition: string
	permalink: string
	thumbnail_id: string
	thumbnail: string
	secure_thumbnail: string
	video_id: string | null
	descriptions: any[]
	accepts_mercadopago: boolean
	non_mercado_pago_payment_methods: any[]
	shipping: Shipping
	international_delivery_mode: string
	seller_contact: any | null
	location: any
	coverage_areas: any[]
	warnings: any[]
	listing_source: string
	variations: any[]
	status: string
	sub_status: any[]
	warranty: string
	catalog_product_id: string
	domain_id: string
	parent_item_id: string | null
	differential_pricing: any | null
	deal_ids: string[]
	automatic_relist: boolean
	date_created: string
	last_updated: string
	health: any | null
	catalog_listing: boolean
	channels: string[]
	sale_terms: SaleTerm[]
	pictures: Picture[]
	attributes: Attribute[]
	seller_address: SellerAddress
}

/* --------------------------------------------- */

interface Item {
	id: string
	condition: string
	free_shipping: boolean
	picture: string
	price: {
		currency: string
		amount: number
		decimals: number
	}
	title: string
}

export interface ItemProduct extends Item {
	description: string
	sold_quantity: number
}

export interface ItemQuery extends Item {
	city: string
}

interface BaseResponse {
	author: {
		name: string
		lastname: string
	}
}

export interface ResponseError extends BaseResponse {
	message: string
}

export interface ResponseItem extends BaseResponse {
	item: ItemProduct
}

export interface ResponseQuery extends BaseResponse {
	items: ItemQuery[]
}

/* ---------------------------------------------------------------------- */

interface Paging {
	total: number
	primary_results: number
	offset: number
	limit: number
}

interface SellerReputationTransactions {
	canceled: number
	completed: number
	period: string
	ratings: {
		negative: number
		neutral: number
		positive: number
	}
	total: number
}

interface SellerReputationMetrics {
	sales: { period: string; completed: number }
	claims: { period: string; rate: number; value: number }
	delayed_handling_time: { period: string; rate: number; value: number }
	cancellations: { period: string; rate: number; value: number }
}

interface SellerReputation {
	level_id: string
	power_seller_status: any
	transactions: SellerReputationTransactions
	metrics: SellerReputationMetrics
}

interface Seller {
	id: number
	nickname: string
	car_dealer: boolean
	real_estate_agency: boolean
	_: boolean
	registration_date: string
	tags: string[]
	car_dealer_logo: string
	permalink: string
	seller_reputation: SellerReputation
}

interface Shipping {
	store_pick_up: boolean
	free_shipping: boolean
	logistic_type: string
	mode: string
	tags: string[]
	benefits: any
	promise: any
}

interface Attributes {
	id: string
	name: string
	value_id: string
	value_name: string
	attribute_group_id: string
	attribute_group_name: string
	value_struct: any
	values: any[]
	source: number
	value_type: string
}

interface Installments {
	quantity: number
	amount: number
	rate: number
	currency_id: string
}

interface Result {
	id: string
	title: string
	condition: string
	thumbnail_id: string
	catalog_product_id: string
	listing_type_id: string
	permalink: string
	buying_mode: string
	site_id: string
	category_id: string
	domain_id: string
	thumbnail: string
	currency_id: string
	order_backend: number
	price: number
	original_price: any
	sale_price: any
	sold_quantity: number
	available_quantity: number
	official_store_id: any
	use_thumbnail_id: boolean
	accepts_mercadopago: boolean
	tags: string[]
	shipping: Shipping
	stop_time: string
	seller: Seller
	seller_address: any
	address: any
	attributes: Attributes[]
	installments: Installments
	winner_item_id: any
	catalog_listing: boolean
	discounts: any
	promotions: any[]
	inventory_id: string
}

interface SortOption {
	id: string
	name: string
}

interface FilterValue {
	id: string
	name: string
	path_from_root?: {
		id: string
		name: string
	}[]
	results?: number
}

interface Filter {
	id: string
	name: string
	type: string
	values: FilterValue[]
}

interface AvailableFilter {
	id: string
	name: string
	type: string
	values: FilterValue[]
}

interface IItemProduct {
	id: string
	name: string
	results: number
}

export interface MercadoLibreResponse {
	site_id: string
	country_default_time_zone: string
	query: string
	paging: Paging
	results: Result[]
	sort: SortOption
	available_sorts: SortOption[]
	filters: Filter[]
	available_filters: AvailableFilter[]
	product: IItemProduct[]
}
