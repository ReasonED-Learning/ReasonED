extends Area2D

signal picked_up(inventory)

onready var collision_shape = $CollisionShape2D

export var can_be_picked_up = bool(true)
var picked_up = bool(false)


# Called when the node enters the scene tree for the first time.
func _ready():
	pass

func _get_ability():
	return get_parent() if get_parent().has_method("_use_ability") else null


func is_picked_up() -> bool:
	return picked_up

func allowed_to_be_picked_up() -> bool:
	return can_be_picked_up and !picked_up

func hide_pickup():
	get_parent().hide()

func show_pickup():
	get_parent().show()

func destroy_pickup():
	get_parent().queue_free()


func pickup(player_inventory):
	if allowed_to_be_picked_up() and Inventory != null:
		if Inventory.add_item(self):
			emit_signal("picked_up", Inventory)
			picked_up = true


func _on_Area2D_body_entered(body):
	pickup(body.find_node("Inventory", true, false))
