from Handler.Update_call import UpdateHandler
from Handler.View_call import ViewHandler

url_pattern = {
    (r"/Update", UpdateHandler),
    (r"/View", ViewHandler),
}
