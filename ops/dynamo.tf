resource "aws_dynamodb_table" "users" {
  count = length(var.environment)

  name           = "mj-${var.environment[count.index]}-users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 7
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "jobs" {
  count = length(var.environment)

  name           = "mj-${var.environment[count.index]}-jobs"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}